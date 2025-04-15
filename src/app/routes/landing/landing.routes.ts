import { Routes } from '@angular/router';
import { LandingHomeComponent } from './home/home.component';
import { LandingWelcomeComponent } from './welcome/welcome.component';

export const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: 'home', component: LandingHomeComponent },
  { path: 'welcome', component: LandingWelcomeComponent },
];
