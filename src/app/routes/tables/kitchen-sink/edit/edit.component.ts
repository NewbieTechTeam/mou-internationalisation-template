import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { FormlyModule } from '@ngx-formly/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';

import {
  Firestore,
  collection,
  doc,
  setDoc,
  updateDoc,
  DocumentReference,
} from '@angular/fire/firestore';
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
  firestore: Firestore = inject(Firestore);
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    // Initialize formData with a copy of the data to avoid direct mutation
    this.form = this.fb.group({
      continent: [this.data.record.continent],
      countryOfPartnerInstitution: [this.data.record.countryOfPartnerInstitution],
      nameOfPartnerInstitution: [this.data.record.nameOfPartnerInstitution],
      // Add more fields as needed
    });
    this.formData = { ...this.data.record };
  }

  async submitForm() {
    if (this.form.valid) {
      // Merge updated form values into original data
      this.formData = { ...this.formData, ...this.form.value };

      try {
        const documentRef = doc(this.firestore, 'mous', this.formData.documentRef);
        await updateDoc(documentRef, this.formData);
        console.log('Document successfully updated!');
        this.dialogRef.close();
      } catch (error) {
        console.error('Error updating document: ', error);
      }
    }
  }
  private async updateRecordInFirestore(updatedRecord: any) {
    try {
      const documentRef = doc(this.firestore, 'mous', updatedRecord.id); // Assuming 'id' is the document ID field
      await setDoc(documentRef, updatedRecord, { merge: true }); // Update the document in Firestore
      console.log('Document successfully updated!');
      // Optionally update the local data (this.list) to reflect changes immediately
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  }
}
