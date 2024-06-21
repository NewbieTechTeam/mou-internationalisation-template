import { Injectable } from '@angular/core';
import { inject } from '@angular/core';

import {
  Firestore,
  collectionData,
  collection,
  addDoc,
  setDoc,
  doc,
  getDoc,
  DocumentReference,
  DocumentSnapshot,
  DocumentData,
  deleteDoc,
  getDocs,
  query,
} from '@angular/fire/firestore';

import { Observable, from } from 'rxjs';
import {
  Auth,
  createUserWithEmailAndPassword,
  deleteUser,
  User,
  onAuthStateChanged,
} from '@angular/fire/auth';
import { switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FirebasePermissionsService {
  firestore: Firestore = inject(Firestore);
  auth = inject(Auth);
  //user$ = user(auth);

  permissions$: Observable<any[]> = new Observable<any[]>();
  permissionsCollection = collection(this.firestore, 'permissions');
  usersCollection = collection(this.firestore, 'users');

  getUserPermissions(uid: string): Observable<any> {
    const docRef = doc(this.firestore, 'permissions', uid);
    return from(getDoc(docRef)).pipe(
      map((docSnap: DocumentSnapshot<DocumentData>) => (docSnap.exists() ? docSnap.data() : null))
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
    return from(setDoc(docRef, permissions));
  }

  createUser(email: string, password: string): Observable<void> {
    return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(
      switchMap(userCredential => {
        const user = userCredential.user;
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
  getUserPermissions2(uid: string): Observable<string[]> {
    const permissionsRef = doc(this.firestore, `permissions/${uid}`);
    return from(getDoc(permissionsRef)).pipe(
      map(doc => (doc.exists() ? doc.data().permissions : []))
    );
  }
}
