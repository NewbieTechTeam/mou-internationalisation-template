import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { MtxButtonModule } from '@ng-matero/extensions/button';
import { TranslateModule } from '@ngx-translate/core';
import { filter } from 'rxjs/operators';

import { AuthService } from '@core/authentication';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MtxButtonModule,
    TranslateModule,
  ],
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly auth = inject(AuthService);

  isSubmitting = false;

  loginForm = this.fb.nonNullable.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
    rememberMe: [false],
  });

  get username() {
    return this.loginForm.get('username')!;
  }

  get password() {
    return this.loginForm.get('password')!;
  }

  get rememberMe() {
    return this.loginForm.get('rememberMe')!;
  }

  login() {
    this.isSubmitting = true;

    this.auth
      //TODO: add back for tokenservice
      //.login(this.username.value, this.password.value, this.rememberMe.value)
      .login(this.username.value, this.password.value)
      .pipe(filter(authenticated => authenticated))
      .subscribe({
        next: () => {
          console.log('logged in');
          this.router.navigateByUrl('/');

          /*       this.router.navigateByUrl('/dashboard').then(success => {
            if (!success) {
              console.error('Navigation to /dashboard failed');
            }
          }).catch((err: any)=>{
            console.log({err});

          }); */
        },
        error: (errorRes: HttpErrorResponse) => {
          if (errorRes.status === 422) {
            const form = this.loginForm;
            const errors = errorRes.error.errors;
            Object.keys(errors).forEach(key => {
              form.get(key === 'email' ? 'username' : key)?.setErrors({
                remote: errors[key][0],
              });
            });
          }
          this.isSubmitting = false;
        },
      });
  }

  continueAsGuest2(): void {
    // Add your continue as guest logic here
  }
  continueAsGuest() {
    this.isSubmitting = true;

    this.auth
      .login('abc@def.com', '1tlcone')
      .pipe(filter(authenticated => authenticated))
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/');
        },
        error: (errorRes: HttpErrorResponse) => {
          if (errorRes.status === 422) {
            const errors = errorRes.error.errors;
            Object.keys(errors).forEach(key => {
              const formControl = this.loginForm.get(key === 'email' ? 'username' : key);
              if (formControl) {
                formControl.setErrors({
                  remote: errors[key][0],
                });
              }
            });
          } else {
            // Handle other error statuses
            this.loginForm.setErrors({
              serverError: errorRes.message,
            });
          }
          this.isSubmitting = false;
        },
      });
  }
}
