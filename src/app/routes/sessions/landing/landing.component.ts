import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    TranslateModule,
    MatExpansionModule,
  ],
})
export class LandingComponent {
  private readonly fb = inject(FormBuilder);

  features = [
    { title: 'Easy to Use', desc: 'Upload and convert instantly without any learning curve.' },
    { title: 'Secure and Confidential', desc: 'Your data is encrypted and never stored.' },
    { title: 'Flexible Output Formats', desc: 'Get results in CSV, XLSX, QBO, or JSON.' },
    { title: 'Quick and Efficient', desc: 'Process hundreds of statements within minutes.' },
    { title: 'Batch Processing', desc: 'Upload multiple files and process together.' },
    { title: 'Reduce Human Error', desc: 'No more manual entry mistakes or oversights.' },
  ];

  pricing = [
    { name: 'STARTER', price: '$10/month', details: '100 pages per month' },
    { name: 'PROFESSIONAL', price: '$25/month', details: '500 pages per month' },
    { name: 'EXPERT', price: '$50/month', details: '2000 pages per month' },
  ];

  faqs = [
    {
      question: 'What is AI Bank Parser Converter?',
      answer: 'It’s a tool to convert bank statements from PDF to usable data formats.',
    },
    {
      question: 'Can I use it for free?',
      answer: 'Yes, we offer a limited free tier to get started.',
    },
    {
      question: 'How does it work?',
      answer: 'Upload your PDF, select format, and download converted data.',
    },
    { question: 'Is my data secure?', answer: 'All uploads are encrypted and processed securely.' },
    {
      question: 'How much does it cost?',
      answer: 'Plans start at $10/month with flexible limits.',
    },
    {
      question: 'What if it doesn’t work with my bank?',
      answer: 'Our parser supports most formats. Contact us for custom formats.',
    },
  ];
  registerForm = this.fb.nonNullable.group(
    {
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    },
    {
      validators: [this.matchValidator('password', 'confirmPassword')],
    }
  );

  matchValidator(source: string, target: string) {
    return (control: AbstractControl) => {
      const sourceControl = control.get(source)!;
      const targetControl = control.get(target)!;
      if (targetControl.errors && !targetControl.errors.mismatch) {
        return null;
      }
      if (sourceControl.value !== targetControl.value) {
        targetControl.setErrors({ mismatch: true });
        return { mismatch: true };
      } else {
        targetControl.setErrors(null);
        return null;
      }
    };
  }
}
