import { Component } from '@angular/core';
import { PageHeaderComponent } from '@shared';

@Component({
  selector: 'app-landing-welcome',
  imports: [PageHeaderComponent],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss',
})
export class LandingWelcomeComponent {}
