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

  init2(): Observable<void> {
    return this.loginService.me().pipe(
      tap(user => {
        if (user) {
          this.user$.next(user);
        } else {
          this.user$.next(null);
        }
      }),
      map(() => undefined), // Map the emission to void
      catchError(() => of(undefined)) // Handle errors and emit void
    );
  }

  change2(): Observable<void> {
    console.log('here init');

    return this.init2();
  }

  check(): boolean {
    // You can directly check if user$ has value or not
    return !!this.user$.getValue().id;
  }

  init(): Observable<User | null> {
    return this.loginService.me().pipe(
      tap(user => {
        if (user) {
          this.user$.next(user);
        } else {
          this.user$.next(null);
        }
      }),
      map(user => user), // Return the user
      catchError(() => {
        this.user$.next(null);
        return of(null);
      })
    );
  }

  change(): Observable<User | null> {
    console.log('Calling change method');
    return this.init();
  }

  login(username: string, password: string): Observable<boolean> {
    return this.loginService.login(username, password).pipe(
      tap(user => {
        if (user) {
          this.user$.next(user);
        } else {
          this.user$.next(null);
        }
      }),
      map(user => !!user),
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
