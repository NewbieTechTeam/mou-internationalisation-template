import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, share, switchMap, tap } from 'rxjs/operators';
import { LoginService } from './login.service';
import { User } from './interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user$ = new BehaviorSubject<User>({});

  constructor(private loginService: LoginService) {}

  init(): Observable<void> {
    return this.loginService.me().pipe(
      tap(user => {
        if (user) {
          this.user$.next(user);
        } else {
          this.user$.next({});
        }
      }),
      map(() => undefined), // Map the emission to void
      catchError(() => of(undefined)) // Handle errors and emit void
    );
  }

  change(): Observable<void> {
    return this.init();
  }

  check(): boolean {
    // You can directly check if user$ has value or not
    return !!this.user$.getValue().id;
  }

  login(username: string, password: string): Observable<boolean> {
    return this.loginService.login(username, password).pipe(
      tap(user => {
        if (user) {
          //this.user$.next(user);
        } else {
          //this.user$.next({}); // Emit empty user object if login fails
        }
      }),
      map(user => !!user), // Map to boolean indicating login success or failure
      catchError(() => of(false))
    );
  }

  logout(): Observable<boolean> {
    return this.loginService.logout().pipe(
      tap(() => this.user$.next({})), // Reset user$ to empty object
      map(() => true), // Map to boolean indicating logout success
      catchError(() => of(false))
    );
  }

  user(): Observable<User> {
    return this.user$.asObservable();
  }

  menu(): Observable<any[]> {
    return this.check() ? this.loginService.menu() : of([]);
  }
}
