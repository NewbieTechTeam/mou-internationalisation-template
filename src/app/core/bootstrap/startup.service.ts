import { guest } from './../authentication/user';
import { Injectable, inject } from '@angular/core';
import { AuthService, User } from '@core/authentication';
import { FirebasePermissionsService } from '@shared/services/firebase-permissions.service';

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

  private setMenu(menu: Menu[]) {
    this.menuService.addNamespace(menu, 'menu');
    this.menuService.set(menu);
  }

  private setPermissions(user: any) {
    // In a real app, you should get permissions and roles from the user information.
    const permissions = ['canAdd', 'canDelete', 'canEdit', 'canRead'];
    console.log('Permissions:', permissions);
    console.log({ user });
    console.log({ user });
    const adminEmail = 'kolawolegolulana@gmail.com';
    if (user.email === adminEmail) {
      this.permissonsService.loadPermissions(permissions);
      this.rolesService.flushRoles();
      this.rolesService.addRolesWithPermissions({ ADMIN: permissions });
    } else {
      const guestPermissions = ['canAdd', 'canDelete', 'canEdit', 'canRead'];
      this.permissonsService.loadPermissions(permissions);
      this.rolesService.addRoles({ GUEST: permissions });
    }

    // Tips: Alternatively you can add permissions with role at the same time.
    //this.rolesService.addRolesWithPermissions({ ADMIN: permissions });
  }
}
