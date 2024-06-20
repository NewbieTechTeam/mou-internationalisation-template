import { Injectable, inject } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from '@angular/fire/auth';
import { User as FirebaseUser } from '@angular/fire/auth';
import { from, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Menu } from '@core';
import { User } from './interface';

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

  me(): Observable<User | null> {
    return new Observable<User | null>(observer => {
      onAuthStateChanged(this.auth, user => {
        if (user) {
          // Assuming User interface can be mapped from FirebaseUser
          const mappedUser: User = {
            id: user.uid,
            email: user.email || '',
            name: user.displayName || '',
          };
          observer.next(mappedUser);
        } else {
          observer.next(null);
        }
        observer.complete();
      });
    });
  }

  me2(): Observable<Menu[]> {
    // Assuming this is how you fetch the menu data from the server
    return this.http.get<{ title: string; link: string }[]>('/me/menu').pipe(
      map(res =>
        res.map(item => ({
          route: item.link, // Assuming 'link' corresponds to 'route' property in Menu
          name: item.title, // Assuming 'title' corresponds to 'name' property in Menu
          type: 'link', // Assuming a default type
          icon: '', // Assuming a default icon
        }))
      )
    );
  }

  me3() {
    return this.http.get<Menu[]>('/me');
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

  menu2(): Observable<Menu[]> {
    // Assuming you have a method to fetch the menu based on the current user
    return this.me().pipe(
      switchMap(user => {
        if (user) {
          // Replace with your actual menu fetching logic
          return of([]);
        } else {
          return of([]);
        }
      })
    );
  }

  menu() {
    return this.http.get<{ menu: Menu[] }>('/me/menu').pipe(map(res => res.menu));
  }
}
