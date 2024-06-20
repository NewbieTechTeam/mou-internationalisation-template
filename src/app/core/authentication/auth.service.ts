import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, share, switchMap, tap } from 'rxjs/operators';
import { LoginService } from './login.service';
import { User } from './interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user$ = new BehaviorSubject<any>({});

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

  init3(): Observable<void> {
    return this.loginService.me().pipe(
      tap({
        next: user => {
          console.log('User fetched from loginService:', user);
          if (user) {
            this.user$.next(user);
            console.log('User data set:', user);
          } else {
            this.user$.next({});
            console.log('No user data found, setting empty object');
          }
        },
        error: err => {
          console.error('Error occurred while fetching user:', err);
        },
        complete: () => {
          console.log('Login service me() observable completed');
        },
      }),
      map(() => {
        console.log('Mapping the result to undefined');
        return undefined;
      }), // Map the emission to void
      catchError(err => {
        console.error('Caught an error:', err);
        return of(undefined);
      }) // Handle errors and emit void
    );
  }

  change(): Observable<void> {
    console.log('here init');

    return this.init();
  }

  check(): boolean {
    // You can directly check if user$ has value or not
    return !!this.user$.getValue().id;
  }

  login(username: string, password: string): Observable<boolean> {
    return this.loginService.login(username, password).pipe(
      tap(user => {
        console.log({ user });

        if (user) {
          this.user$.next(user);
        } else {
          this.user$.next({}); // Emit empty user object if login fails
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
