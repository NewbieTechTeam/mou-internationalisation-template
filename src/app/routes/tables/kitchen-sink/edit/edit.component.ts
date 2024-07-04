import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { FormlyModule } from '@ngx-formly/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-table-kitchen-sink-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    JsonPipe,
    ReactiveFormsModule,
    FormsModule,
    FormlyModule,
    MatCardModule,
    MatFormFieldModule,
  ],
})
export class TablesKitchenSinkEditComponent {
  readonly dialogRef = inject(MatDialogRef);
  readonly data = inject(MAT_DIALOG_DATA);
  formData: any;

  constructor() {
    // Initialize formData with a copy of the data to avoid direct mutation
    this.formData = { ...this.data.record };
  }

  submitForm(): void {
    // Submit logic here, update record or perform any other action
    // For example, you can update the Firestore document here
    // Close the dialog after saving
  }
}
