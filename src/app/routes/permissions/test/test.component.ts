import { FirebasePermissionsService } from '@shared/services/firebase-permissions.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MtxAlertModule } from '@ng-matero/extensions/alert';
import { NgxPermissionsModule, NgxPermissionsService } from 'ngx-permissions';

import { PageHeaderComponent } from '@shared';

@Component({
  selector: 'app-permissions-test',
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss',
  standalone: true,
  imports: [
    JsonPipe,
    MtxAlertModule,
    NgxPermissionsModule,
    PageHeaderComponent,
    FormsModule,
    MatFormFieldModule,
    MatCardModule,
    MatCheckboxModule,
  ],
})
export class PermissionsTestComponent implements OnInit {
  private readonly permissionsSrv = inject(NgxPermissionsService);
  private readonly firebasePermissionsService = inject(FirebasePermissionsService);
  users: any[] = [];
  private userSubscription: any;

  comparedPermission: string[] = ['guest'];
  newUserEmail: string = '';
  newUserPassword: string = '';
  originalEmail: string = ''; // Capture original user's email
  originalPassword: string = '';

  getPermissions() {
    return Object.keys(this.permissionsSrv.getPermissions());
  }

  ngOnInit() {
    this.userSubscription = this.firebasePermissionsService.getAllUsers().subscribe({
      next: (users: any) => {
        console.log('Users:', users);
      },
      error: (error: any) => {
        // Explicitly typing the 'error' parameter
        console.error('Error fetching users:', error);
      },
    });
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

  createUser() {
    if (this.newUserEmail && this.newUserPassword && this.originalEmail && this.originalPassword) {
      this.firebasePermissionsService
        .createUser(
          this.newUserEmail,
          this.newUserPassword,
          this.originalEmail,
          this.originalPassword
        )
        .subscribe({
          next: () => {
            console.log('User created');
            this.newUserEmail = '';
            this.newUserPassword = '';
            this.loadUsers();
          },
          error: error => {
            console.error('Error creating user:', error);
          },
        });
    }
  }

  createUser2() {
    if (this.newUserEmail && this.newUserPassword) {
      this.firebasePermissionsService
        .createUser2(this.newUserEmail, this.newUserPassword)
        .subscribe({
          next: (user: any) => {
            console.log('User created:', user);
            // Reset form fields
            this.newUserEmail = '';
            this.newUserPassword = '';
          },
          error: (error: any) => {
            console.log(this.newUserEmail);

            console.error('Error creating user:', error);
          },
        });
    }
  }

  loadUsers(): void {
    this.firebasePermissionsService.getAllUsers().subscribe((users: any) => {
      this.users = users;
    });
  }

  deleteUser(uid: string) {
    this.firebasePermissionsService.deleteUser(uid).subscribe({
      next: () => {
        console.log('User deleted');
        this.loadUsers();
      },
      error: error => {
        console.error('Error deleting user:', error);
      },
    });
  }
}
