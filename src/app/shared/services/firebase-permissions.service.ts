import { Injectable } from '@angular/core';
import {
  Firestore,
  collectionData,
  collection,
  addDoc,
  DocumentReference,
} from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root',
})
export class FirebasePermissionsService {
  firestore: Firestore = inject(Firestore);
  permissions$: Observable<any[]> = new Observable<any[]>();
  permissionsCollection = collection(this.firestore, 'permissions');

  getUserPermissions(uid: string): Observable<any> {
    const docRef = doc(this.firestore, 'permissions', uid);
    return from(getDoc(docRef)).pipe(map(docSnap => (docSnap.exists() ? docSnap.data() : null)));
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
