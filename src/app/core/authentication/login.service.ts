import { Injectable, inject } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from '@angular/fire/auth';
import { User as FirebaseUser } from '@angular/fire/auth';
import { from, Observable, of } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Menu } from '@core';
import { Token, User } from './interface';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  protected readonly auth = inject(Auth);
  protected readonly http = inject(HttpClient);

  login(email: string, password: string): Observable<FirebaseUser | null> {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      map(result => result.user)
    );
  }

  logout(): Observable<void> {
    return from(signOut(this.auth));
  }

  refresh(params: Record<string, any>) {
    return this.http.post<Token>('/auth/refresh', params);
  }

  me(): Observable<User | null> {
    return new Observable<User | null>(observer => {
      onAuthStateChanged(this.auth, user => {
        if (user) {
          // Assuming User interface can be mapped from FirebaseUser
          const mappedUser: User = {
            id: user.uid,
            email: user.email || '',
            name: user.displayName || '',
            avatar: '../../../assets/images/silhouette.png',
          };
          observer.next(mappedUser);
        } else {
          observer.next(null);
        }
        observer.complete();
      });
    });
  }

  private mapType(type: string): 'link' | 'sub' | 'extLink' | 'extTabLink' | 'default' {
    // Map the type string to one of the predefined types
    switch (type) {
      case 'link':
      case 'sub':
      case 'extLink':
      case 'extTabLink':
        return type;
      default:
        return 'default'; // Return a default type if the type is unknown
    }
  }

  menu2() {
    return this.http.get<{ menu: Menu[] }>('/me/menu').pipe(map(res => res.menu));
  }
  menu(): Observable<Menu[]> {
    return this.http.get<{ menu: Menu[] }>('/me/menu').pipe(
      tap(res => {
        console.log('HTTP Response:', res);
      }),
      map(res => res.menu),
      tap(menu => {
        console.log('Menu array:', menu);
      })
    );
  }
}
