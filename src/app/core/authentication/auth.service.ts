import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, of, from, merge } from 'rxjs';
import { catchError, map, share, switchMap, tap } from 'rxjs/operators';
import { LoginService } from './login.service';
import { TokenService } from './token.service';
import { User } from './interface';
import { Auth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from '@angular/fire/auth';
import { filterObject, isEmptyObject } from './helpers';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user$ = new BehaviorSubject<any>({});
  protected readonly auth = inject(Auth);
  protected readonly loginService = inject(LoginService);

  private readonly tokenService = inject(TokenService);

  private change$ = merge().pipe(
  //TODO: stuff too do token setup
  // this.tokenService.change(),
  // this.tokenService.refresh().pipe(switchMap(() => this.refresh()))
    switchMap(() => this.assignUser()),
    share()
  );

  initv2() {
    return new Promise<void>(resolve => this.change$.subscribe(() => resolve()));
  }

  init2(): Observable<void> {
    return this.loginService.me().pipe(
      tap(user => {
        if (user) {
          // this.initv2()
          this.user$.next(user);
        } else {
          this.user$.next(null);
        }
      }),
      map(() => undefined), // Map the emission to void
      catchError(() => of(undefined)) // Handle errors and emit void
    );
  }

  check(): boolean {
    console.log('checking');
    console.log(!this.user$.getValue().uid);
    return !this.user$.getValue().uid && true;
    //return !!this.user$.getValue().uid;
    //TODO: get back to tokenservice where
    //check() {
    /*
      return this.tokenService.valid();
    } */
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

  login(username: any, password: any): Observable<boolean> {
    return this.loginService.login(username, password).pipe(
      tap(user => {
        console.log({ user });
        if (user) {
          this.user$.next(user);
          //this.tokenService.set(user.toke); // Assuming the token is part of the user object
        } else {
          this.user$.next(null);
        }
      }),
      map(user => !!user),
      catchError(() => of(false))
    );
  }

  loginzz(email: any, password: any): Observable<boolean> {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      tap((result: any) => {
        this.user$.next(result.user);
        result.user.getIdToken().then((token: string) => {
          this.tokenService.set({
            accessToken: 'user.stsTokenManager.accessToken',
            refreshToken: 'user.stsTokenManager.refreshToken',
          });
        });
      }),
      map((result: any) => !!result.user),
      catchError(() => of(false))
    );
  }
  logout(): Observable<boolean> {
    return this.loginService.logout().pipe(
      tap(() => {
        this.user$.next({});
        this.tokenService.clear();
      }), // Reset user$ to empty object and clear token
      map(() => true), // Map to boolean indicating logout success
      catchError(() => of(false))
    );
  }

  user(): Observable<User> {
    return this.user$.asObservable();
  }

  menu(): Observable<any[]> {
    console.log('this.check()');
    console.log(this.check());
    return this.check() ? this.loginService.menu() : of([]);
  }

  private assignUser() {
    if (!this.check()) {
      return of({}).pipe(tap(user => this.user$.next(user)));
    }

    if (!isEmptyObject(this.user$.getValue())) {
      return of(this.user$.getValue());
    }

    return this.loginService.me().pipe(tap(user => this.user$.next(user)));
  }

  refresh() {
    return this.loginService
      .refresh(filterObject({ refresh_token: this.tokenService.getRefreshToken() }))
      .pipe(
        catchError(() => of(undefined)),
        tap(token => {
          this.tokenService.set({
            accessToken: 'this.user.stsTokenManager.accessToken',
            refreshToken: 'this.user.stsTokenManager.refreshToken',
          });
        }),
        map(() => this.check())
      );
  }
}
