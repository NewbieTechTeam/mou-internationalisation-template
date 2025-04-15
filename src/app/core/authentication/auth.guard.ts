import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard = (route?: ActivatedRouteSnapshot, state?: RouterStateSnapshot) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  // TODO: review this route
  return auth.check() ? true : router.parseUrl('/landing/welcome');
  // return auth.check() ? true : router.parseUrl('/auth/login');
};
