import { FirebasePermissionsService } from '@shared/services/firebase-permissions.service';
import { JsonPipe, CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MtxAlertModule } from '@ng-matero/extensions/alert';
import { NgxPermissionsModule, NgxPermissionsService } from 'ngx-permissions';

import { PageHeaderComponent } from '@shared';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-permissions-test',
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss',
  standalone: true,
  imports: [MtxAlertModule, NgxPermissionsModule, CommonModule],
})
export class PermissionsTestComponent implements OnInit {
  users$: Observable<any[]> | undefined; // Initialize with undefined

  private readonly permissionsSrv = inject(NgxPermissionsService);
  private readonly firebasePermissionsSrv = inject(FirebasePermissionsService);

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.users$ = this.firebasePermissionsSrv.getAllUsers();
  }

  comparedPermission: string[] = ['guest'];

  getPermissions() {
    return Object.keys(this.permissionsSrv.getPermissions());
  }

  addPermission() {
    // this.permissionsSrv.loadPermissions(['admin']);
    this.permissionsSrv.addPermission('admin', () => {
      // return false;
      return new Promise<boolean>((resolve, reject) => {
        setTimeout(() => resolve(true), 2000);
      });
    });
  }

  removePermission() {
    this.permissionsSrv.removePermission('admin');
  }

  unAuthorized() {
    console.log('unAuthorized');
  }

  authorized() {
    console.log('authorizes');
  }

  changeToAdmin() {
    this.comparedPermission = ['admin'];
    console.log(this.comparedPermission);
  }

  changeToAnotherPermission() {
    this.comparedPermission = ['awesome'];
    console.log(this.comparedPermission);
  }

  changeToGuest() {
    this.comparedPermission = ['guest'];
    console.log(this.comparedPermission);
  }

  createUser(email: string, password: string) {
    const currentUser = this.firebasePermissionsSrv.auth.currentUser;
    if (currentUser) {
      const originalEmail = currentUser.email || ''; // Default to empty string if null
      const originalPassword = '1tlcone'; // You should securely retrieve or manage the original password
      this.firebasePermissionsSrv
        .createUser(email, password, originalEmail, originalPassword)
        .subscribe(
          () => {
            console.log('User created successfully.');
            this.loadUsers(); // Reload users after creating a new user
          },
          error => {
            console.error('Error creating user 1:', error);
            // Handle error (show error message, log, etc.)
          }
        ),
        (err: any) => {
          console.error('Error creating user 2:', err);
          // Handle error (show error message, log, etc.)
        };
    } else {
      console.error('No authenticated user found.');
      // Handle case where no authenticated user is found
    }
  }

  adjustUserPermissions(user: any, role: string) {
    this.firebasePermissionsSrv.adjustUserPermissions(user.uid, role).subscribe(() => {
      this.users$ = this.firebasePermissionsSrv.getAllUsers();
      //TOD0: review
      //this.rolesSrv.flushRolesAndPermissions();
    });
  }

  adjustUserPermissions2(user: any, permission: string) {
    console.log({ permission });

    if (user.permissions.includes(permission)) {
      user.permissions = user.permissions.filter((p: string) => p !== permission);
    } else {
      user.permissions.push(permission);
    }

    this.firebasePermissionsSrv.setUserPermissions(user.uid, user.permissions).subscribe(() => {
      this.loadUsers();
    });
  }
}
