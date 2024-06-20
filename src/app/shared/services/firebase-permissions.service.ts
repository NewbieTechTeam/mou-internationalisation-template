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
} from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FirebasePermissionsService {
  firestore: Firestore = inject(Firestore);
  auth = inject(Auth);

  permissions$: Observable<any[]> = new Observable<any[]>();
  permissionsCollection = collection(this.firestore, 'permissions');

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
}
