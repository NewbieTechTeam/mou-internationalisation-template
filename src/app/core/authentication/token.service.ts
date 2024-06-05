import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Observable, from, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor(private afAuth: Auth) {}

  change(): Observable<any> {
    return new Observable(observer => {
      const unsubscribe = this.afAuth.onAuthStateChanged(user => {
        observer.next(user);
      });
      return () => unsubscribe();
    });
  }

  // Other methods like set, clear, valid, getBearerToken, getRefreshToken
}
