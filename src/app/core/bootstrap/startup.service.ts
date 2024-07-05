import { guest } from './../authentication/user';
import { Injectable, inject } from '@angular/core';
import { AuthService, User } from '@core/authentication';
//import { FirebasePermissionsService } from '@shared/services/firebase-permissions.service';
import { FirebasePermissionsService } from '../../shared/services/firebase-permissions.service';

import { NgxPermissionsService, NgxRolesService } from 'ngx-permissions';
import { switchMap, tap } from 'rxjs';
import { Menu, MenuService } from './menu.service';

@Injectable({
  providedIn: 'root',
})
export class StartupService {
  private readonly authService = inject(AuthService);
  private readonly menuService = inject(MenuService);
  private readonly permissonsService = inject(NgxPermissionsService);
  private readonly rolesService = inject(NgxRolesService);

  /**
   * Load the application only after get the menu or other essential informations
   * such as permissions and roles.
   */
  load2() {
    return new Promise<void>((resolve, reject) => {
      this.authService
        .change()
        .pipe(
          tap(user => {
            console.log('User in StartupService:', user);
            this.setPermissions(user);
          }),
          switchMap(() => this.authService.menu()),
          tap(menu => {
            console.log({ menu });

            this.setMenu(menu);
          })
        )
        .subscribe({
          next: () => resolve(),
          error: () => resolve(),
        });
    });
  }

  /**
   * Load the application only after getting the menu or other essential information
   * such as permissions and roles.
   */
  load() {
    return new Promise<void>((resolve, reject) => {
      this.authService
        .change()
        .pipe(
          tap(user => {
            console.log('User in StartupService:', user);
            this.setPermissions(user);
          }),
          switchMap(() => this.authService.menu()),
          tap(menu => {
            console.log('Menu in StartupService:', menu);
            this.setMenu(menu);
          }),
          tap({
            next: () => {
              console.log('Load completed successfully');
              resolve();
            },
            error: err => {
              console.error('Error during load:', err);
              resolve(); // Ensure the application proceeds even if there is an error
            },
          })
        )
        .subscribe();
    });
  }

  private setMenu(menu: Menu[]) {
    this.menuService.addNamespace(menu, 'menu');
    this.menuService.set(menu);
  }

  private setPermissions(user: any) {
    // In a real app, you should get permissions and roles from the user information.
    const permissions = ['canAdd', 'canDelete', 'canEdit', 'canRead'];
    this.permissonsService.loadPermissions(permissions);
    this.rolesService.flushRoles();
    this.rolesService.addRoles({ ADMIN: permissions });

    // Tips: Alternatively you can add permissions with role at the same time.
    // this.rolesService.addRolesWithPermissions({ ADMIN: permissions });
  }
  private setPermissions2(user: any) {
    // In a real app, you should get permissions and roles from the user information.
    const permissions = ['canAdd', 'canDelete', 'canEdit', 'canRead'];
    console.log('========user==========', user);
    console.log('========user==========', user);

    console.log('Permissions:', permissions);
    const adminEmail = 'kolawolegolulana@gmail.com';
    if (user.email == adminEmail) {
      this.permissonsService.loadPermissions(permissions);
      this.rolesService.flushRoles();
      this.rolesService.addRolesWithPermissions({ ADMIN: permissions });
    } else {
      const guestPermissions = ['canAdd', 'canDelete', 'canEdit', 'canRead'];
      this.permissonsService.loadPermissions(permissions);
      this.rolesService.addRoles({ ADMIN: permissions });
    }

    // Tips: Alternatively you can add permissions with role at the same time.
    this.rolesService.addRolesWithPermissions({ ADMIN: permissions });
  }
}
