import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import {
  Firestore,
  collectionData,
  collection,
  addDoc,
  setDoc,
  updateDoc,
  doc,
  getDoc,
  DocumentReference,
  DocumentSnapshot,
  DocumentData,
  deleteDoc,
  getDocs,
  query,
} from '@angular/fire/firestore';

import { from, Observable, of } from 'rxjs';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  deleteUser,
  User,
  onAuthStateChanged,
} from '@angular/fire/auth';
import { switchMap, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FirebasePermissionsService {
  firestore: Firestore = inject(Firestore);
  auth = inject(Auth);
  //user$ = user(auth);
  private originalUser: User | null = null;

  permissions$: Observable<any[]> = new Observable<any[]>();
  permissionsCollection = collection(this.firestore, 'permissions');
  usersCollection = collection(this.firestore, 'users');

  permissionsConfig: Record<string, string[]> = {
    ADMIN: ['canAdd', 'canDelete', 'canEdit', 'canRead'],
    MANAGER: ['canAdd', 'canEdit', 'canRead'],
    GUEST: ['canRead'],
  };

  getUserPermissions2(uid: string): Observable<any> {
    const docRef = doc(this.firestore, 'permissions', uid);
    return from(getDoc(docRef)).pipe(
      map((docSnap: DocumentSnapshot<DocumentData>) => (docSnap.exists() ? docSnap.data() : null))
    );
  }

  getUserPermissions(uid: string): Observable<any> {
    const docRef = doc(this.firestore, 'permissions', uid);
    return from(getDoc(docRef)).pipe(
      map((docSnap: DocumentSnapshot<DocumentData>) => {
        if (docSnap.exists()) {
          console.log('Document data:', docSnap.data());
          return docSnap.data();
        } else {
          console.log('No such document!');
          return null;
        }
      }),
      catchError(error => {
        console.error('Error fetching document:', error);
        return of(null);
      })
    );
  }

  getCurrentUser(): Observable<any> {
    return new Observable(observer => {
      onAuthStateChanged(this.auth, user => {
        if (user) {
          this.getUserPermissions(user.uid).subscribe(permissions => {
            observer.next(permissions);
            observer.complete();
          });
        } else {
          observer.next(null);
          observer.complete();
        }
      });
    });
  }

  setUserPermissions(uid: string, permissions: any): Observable<void> {
    const docRef = doc(this.firestore, 'permissions', uid);
    return from(updateDoc(docRef, { permissions }));
  }

  createUser(
    email: string,
    password: string,
    originalEmail: string,
    originalPassword: string
  ): Observable<void> {
    // Save the current user before creating a new one
    this.originalUser = this.auth.currentUser;

    return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(
      switchMap(userCredential => {
        const user = userCredential.user;
        console.log('{ cool }', { user });

        if (user) {
          // Add user to Firestore 'users' collection
          const userRef = doc(this.firestore, `users/${user.uid}`);
          return from(
            setDoc(userRef, {
              email: user.email,
              uid: user.uid,
            })
          ).pipe(
            switchMap(() => this.setDefaultPermissions(user.uid)),
            switchMap(() => this.reauthenticateOriginalUser(originalEmail, originalPassword))
          );
        } else {
          throw new Error('User creation failed');
        }
      }),
      catchError((error: any) => {
        // If there's an error, reauthenticate the original user
        return this.reauthenticateOriginalUser(originalEmail, originalPassword).pipe(
          switchMap(() => {
            throw error;
          })
        );
      })
    );
  }

  private reauthenticateOriginalUser(email: string, password: string): Observable<void> {
    if (this.originalUser) {
      return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
        switchMap(() => of(undefined))
      );
    } else {
      return of(undefined);
    }
  }

  createUser2(
    email: string,
    password: string,
    originalEmail: string,
    originalPassword: string
  ): Observable<void> {
    // Save the current user before creating a new one
    this.originalUser = this.auth.currentUser;

    return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(
      switchMap(userCredential => {
        const user = userCredential.user;

        if (user) {
          const userRef = doc(this.firestore, `users/${user.uid}`);
          return from(setDoc(userRef, { email: user.email, uid: user.uid })).pipe(
            switchMap(() => this.setDefaultPermissions(user.uid)),
            switchMap(() => this.reauthenticateOriginalUser(originalEmail, originalPassword))
          );
        } else {
          throw new Error('User creation failed');
        }
      }),
      catchError((error: any) => {
        // If there's an error, reauthenticate the original user
        return this.reauthenticateOriginalUser(originalEmail, originalPassword).pipe(
          switchMap(() => {
            throw error;
          })
        );
      })
    );
  }

  private reauthenticateOriginalUser2(email: string, password: string): Observable<void> {
    if (this.originalUser) {
      return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
        switchMap(() => of(undefined))
      );
    } else {
      return of(undefined);
    }
  }

  createUser3(email: string, password: string): Observable<void> {
    return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(
      switchMap(userCredential => {
        const user = userCredential.user;
        console.log('{ cool }', { user });

        if (user) {
          // Add user to Firestore 'users' collection
          const userRef = doc(this.firestore, `users/${user.uid}`);
          return from(
            setDoc(userRef, {
              email: user.email,
              uid: user.uid,
            })
          ).pipe(switchMap(() => this.setDefaultPermissions(user.uid)));
        } else {
          throw new Error('User creation failed');
        }
      })
    );
  }

  // Delete user by UID
  deleteUser(uid: string): Observable<void> {
    const userDocRef = doc(this.firestore, `users/${uid}`);
    const currentUser = this.auth.currentUser;

    if (currentUser && currentUser.uid === uid) {
      return from(deleteUser(currentUser)).pipe(switchMap(() => from(deleteDoc(userDocRef))));
    } else {
      throw new Error('No authenticated user found or mismatched UID');
    }
  }

  // Get all users
  getAllUsers(): Observable<any[]> {
    const usersCollectionRef = collection(this.firestore, 'users');
    return from(getDocs(query(usersCollectionRef))).pipe(
      map(snapshot => snapshot.docs.map(doc => ({ uid: doc.id, ...doc.data() })))
    );
  }

  // Set default permissions for a new user
  private setDefaultPermissions(uid: string): Observable<void> {
    const permissionsRef = doc(this.firestore, `permissions/${uid}`);
    const defaultPermissions = ['read']; // Example default permissions
    return from(setDoc(permissionsRef, { permissions: defaultPermissions }));
  }

  // Get permissions for a user by UID
  getUserPermissions3(uid: string): Observable<string[]> {
    const permissionsRef = doc(this.firestore, `permissions/${uid}`);
    return from(getDoc(permissionsRef)).pipe(
      map(doc => (doc.exists() ? doc.data().permissions : []))
    );
  }

  adjustUserPermissions(uid: string, role: string): Observable<void> {
    const permissions: any = this.permissionsConfig[role] || [];
    console.log({ permissions });

    return this.setUserPermissions(uid, permissions);
  }
}
