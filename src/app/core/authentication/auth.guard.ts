import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  CanActivateFn,
} from '@angular/router';
import { AuthService } from './auth.service';
import { Auth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean> | boolean => {
  const router = inject(Router);
  const angularFireAuth = inject(Auth);

  return new Observable<boolean>(observer => {
    onAuthStateChanged(
      angularFireAuth,
      user => {
        if (user) {
          observer.next(true);
          observer.complete();
        } else {
          observer.next(false);
          observer.complete();
          router.navigate(['/auth/login']);
        }
      },
      () => {
        observer.next(false);
        observer.complete();
        router.navigate(['/auth/login']);
      }
    );
  });
};
