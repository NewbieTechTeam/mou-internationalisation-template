import { Routes } from '@angular/router';

import { FormsDatetimeComponent } from './datetime/datetime.component';
import { FormsDynamicComponent } from './dynamic/dynamic.component';
import { FormsElementsComponent } from './elements/elements.component';
import { FormsSelectComponent } from './select/select.component';
import { ngxPermissionsGuard } from 'ngx-permissions';

export const routes: Routes = [
  { path: 'elements', component: FormsElementsComponent },
  {
    path: 'dynamic',
    component: FormsDynamicComponent,
    data: {
      permissions: {
        except: 'GUEST',
        redirectTo: '/dashboard',
      },
    },
  },
  { path: 'select', component: FormsSelectComponent },
  { path: 'datetime', component: FormsDatetimeComponent },
];
