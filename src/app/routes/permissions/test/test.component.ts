import { FirebasePermissionsService } from '@shared/services/firebase-permissions.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
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
export class PermissionsTestComponent {
  private readonly permissionsSrv = inject(NgxPermissionsService);
  private readonly firebasePermissionsService = inject(FirebasePermissionsService);
  users: any[] = [];

  comparedPermission: string[] = ['guest'];
  newUserEmail: string = '';
  newUserPassword: string = '';

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

  createUser() {}

  loadUsers(): void {
    this.firebasePermissionsService.getAllUsers().subscribe((users: any) => {
      this.users = users;
    });
  }
}
