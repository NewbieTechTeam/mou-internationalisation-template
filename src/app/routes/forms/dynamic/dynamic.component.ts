import { MatFormFieldModule } from '@angular/material/form-field';
import { Component, inject } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions, FormlyModule } from '@ngx-formly/core';

import { ToastrService } from 'ngx-toastr';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { PageHeaderComponent } from '@shared';
import { Storage, ref, getDownloadURL, uploadBytesResumable } from '@angular/fire/storage';
import { Router } from '@angular/router';

import {
  Firestore,
  collectionData,
  collection,
  addDoc,
  DocumentReference,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-forms-dynamic',
  templateUrl: './dynamic.component.html',
  styleUrl: './dynamic.component.scss',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    FormlyModule,
    PageHeaderComponent,
    MatFormFieldModule,
  ],
})
export class FormsDynamicComponent {
  private readonly toast = inject(ToastrService);

  firestore: Firestore = inject(Firestore);
  storage: Storage = inject(Storage);
  options: FormlyFormOptions = {};

  columns3: any[] = [
    {
      header: 'Continent',
      field: 'continent',
      className: 'col-sm-3',
      type: 'select',
      options: [
        { id: 1, name: 'Africa' },
        { id: 2, name: 'Asia' },
        { id: 3, name: 'Europe' },
        { id: 4, name: 'North America' },
        { id: 5, name: 'South America' },
        { id: 6, name: 'Oceania' },
        { id: 7, name: 'Antarctica' },
        // Add more continents as needed
      ],
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: 'Country',
      field: 'country',
      type: 'select',
      className: 'col-sm-3',
      options: [
        { id: 1, name: 'Country 1' },
        { id: 2, name: 'Country 2' },
        // Add more countries as needed
      ],
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: 'Name of Partner Institution',
      field: 'partnerInstitution',
      type: 'text',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: 'Category',
      field: 'category',
      type: 'select',
      options: [
        { id: 1, name: 'Category 1' },
        { id: 2, name: 'Category 2' },
        // Add more categories as needed
      ],
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: 'Purpose of the MoU',
      field: 'purposeOfTheMoU',
      type: 'textarea',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: 'Status',
      field: 'status',
      type: 'select',
      options: [
        { id: 1, name: 'Active' },
        { id: 2, name: 'Inactive' },
        // Add more status options as needed
      ],
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: 'Highlight',
      field: 'highlights',
      type: 'textarea',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: 'Duration of MoU',
      field: 'durationOfMoU',
      type: 'number',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: 'Start date',
      field: 'startDate',
      type: 'date',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: 'Expiry date',
      field: 'expiryDate',
      type: 'date',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: 'Responsible TUT Faculty',
      field: 'responsibleTutFaculty',
      type: 'text',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: 'Responsible TUT Department',
      field: 'responsibleTutDepartment',
      type: 'text',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: 'Responsible TUT Official',
      field: 'responsibleTutOfficial',
      type: 'text',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: 'Responsible TUT Telephone',
      field: 'responsibleTutTelephone',
      type: 'text',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: 'Responsible TUT Official Telephone',
      field: 'responsibleTutOfficialTelephone',
      type: 'text',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: 'Responsible TUT Official Email',
      field: 'responsibleTutOfficialEmail',
      type: 'email',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: 'Responsible Partner Faculty',
      field: 'responsiblePartnerFaculty',
      type: 'text',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: 'Responsible Partner Department',
      field: 'responsiblePartnerDepartment',
      type: 'text',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: 'Responsible Partner Official',
      field: 'responsiblePartnerOfficial',
      type: 'text',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: 'Responsible Partner Official Telephone',
      field: 'responsiblePartnerOfficialTelephone',
      type: 'text',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: 'Responsible Partner Official Email',
      field: 'responsiblePartnerOfficialEmail',
      type: 'email',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: 'Partner Signatory',
      field: 'partnerSignatory',
      type: 'text',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: 'TUT Signatory',
      field: 'tutSignatory',
      type: 'text',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
  ];

  form = new FormGroup({});
  form3 = new FormGroup({});

  //model = { file: null, downloadURL: '' };
  model: { [key: string]: any } = {};

  options3: FormlyFormOptions = {};

  fields: FormlyFieldConfig[] = [
    {
      key: 'text',
      className: 'col-sm-3',
      type: 'input',
      templateOptions: {
        label: 'Text',
        placeholder: 'Type here to see the other field become enabled...',
        required: true,
      },
    },
    {
      key: 'text2',
      type: 'input',
      templateOptions: {
        label: 'Hey!',
        placeholder: 'This one is disabled if there is no text in the other input',
      },
      expressionProperties: {
        'templateOptions.disabled': '!model.text',
      },
    },
    {
      key: 'email',
      type: 'input',
      templateOptions: {
        label: 'Email address',
        placeholder: 'Enter email',
        required: true,
      },
    },
  ];

  fields3: FormlyFieldConfig[];

  // Advanced Layout
  form2 = new FormGroup({});
  model2 = {};
  fields2: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-sm-6',
          type: 'input',
          key: 'country',
          templateOptions: {
            label: 'Country',
            required: true,
          },
        },
        {
          className: 'col-sm-6',
          type: 'input',
          key: 'nameOfPartnerInstitution2',
          templateOptions: {
            label: 'Name Of Partner Institution',
            required: true,
          },
          expressionProperties: {
            'templateOptions.disabled': '!model.country',
          },
        },
      ],
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-sm-6',
          type: 'file',
          key: 'category',
        },
        {
          className: 'col-sm-3',
          type: 'textarea',
          key: 'purposeOfTheMoU',
          templateOptions: {
            label: 'Purpose Of The Mou',
          },
        },
        {
          className: 'col-sm-3',
          type: 'textarea',
          key: 'highlights',
          templateOptions: {
            type: 'text',
            label: 'Highlight',
          },
        },
      ],
    },
    {
      type: 'textarea',
      key: 'otherInput',
      templateOptions: {
        label: 'Other Input',
      },
    },
    {
      type: 'checkbox',
      key: 'otherToo',
      templateOptions: {
        label: 'Other Checkbox',
      },
      wrappers: ['div'],
    },
  ];

  constructor(private router: Router) {
    this.fields3 = this.createFieldsFromColumns(this.columns3);
  }

  mapToFormlyField(column: any): FormlyFieldConfig {
    let type: string;
    const templateOptions: any = {
      label: column.header,
      placeholder: `Enter ${column.header}`,
    };

    switch (column.type) {
      case 'textarea':
        type = 'textarea';
        break;
      case 'select':
        type = 'select';
        templateOptions.options = column.options;
        templateOptions.labelProp = 'name';
        templateOptions.valueProp = 'id';
        break;
      case 'date':
        type = 'input';
        templateOptions.type = 'date';
        break;
      case 'number':
        type = 'input';
        templateOptions.type = 'number';
        break;
      case 'email':
        type = 'input';
        templateOptions.type = 'email';
        break;
      case 'file':
        type = 'file';
        templateOptions.type = 'file';
        break;
      default:
        type = 'input';
        templateOptions.type = 'text';
        break;
    }

    return {
      key: column.field,
      type,
      templateOptions,
    };
  }
  submit() {
    if (this.form.valid) {
      this.showToast(this.model);
    }
  }

  submit2() {
    console.log('submitting', this.form.valid, this.model.file);

    if (this.form.valid && this.model.file) {
      const file = this.model.file as File | null;
      if (file) {
        const filePath = `pdfs/${file.name}`;
        const storageRef = ref(this.storage, filePath);

        try {
          // Upload file to Firebase Storage
          const uploadTask = uploadBytesResumable(storageRef, file);
          this.toast.success('Please Wait A few Secconds');

          uploadTask.on(
            'state_changed',
            snapshot => {
              // Track upload progress if needed
              const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
              console.log(`Upload is ${progress}% done`);
            },
            error => {
              console.error('Error uploading file', error);
              this.toast.error(`Error uploading file: ${error.message}`);
            },

            async () => {
              // Upload completed successfully, now get the download URL
              try {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                console.log('File available at', downloadURL);

                // Add downloadURL to the model or any other logic you need before saving to Firestore
                this.model.downloadURL = downloadURL;
                this.model.file = '';

                // Save the model with downloadURL to Firestore collection 'forms'
                try {
                  const docRef = await addDoc(collection(this.firestore, 'forms'), this.model);
                  console.log('Document written with ID: ', docRef.id);
                  this.toast.success('MOU ADDED');
                  this.resetFormAndNavigate();
                } catch (e: any) {
                  console.error('Error adding document', e);
                  this.toast.error(`Error adding document: ${e.message}`);
                }
              } catch (e: any) {
                console.error('Error getting download URL', e);
                //  this.toast.error(`Error getting download URL: ${e.message}`);
              }
            }
          );
        } catch (error: any) {
          console.error('Error uploading file', error);
          this.toast.error(`Error uploading file: ${error.message}`);
        }
      } else {
        this.toast.warning('Please select a file');
      }
    }
  }

  resetFormAndNavigate() {
    this.form3.reset();
    this.model = {};
    this.router.navigate(['/dashboard']); // Replace '/dashboard' with your actual dashboard route
  }

  showToast(obj: any) {
    this.toast.success(JSON.stringify(obj));
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.model.file = file;
    }
  }
  // Create Formly field configurations from columns
  createFieldsFromColumns(columns: any[]): FormlyFieldConfig[] {
    return columns.map(column => {
      let type: string;
      const templateOptions: any = {
        label: column.header,
        placeholder: `Enter ${column.header}`,
      };

      switch (column.type) {
        case 'textarea':
          type = 'textarea';
          break;
        case 'select':
          type = 'select';
          templateOptions.options = column.options || [
            { id: 1, name: 'Option 1' },
            { id: 2, name: 'Option 2' },
            // Add more default options as needed
          ];
          templateOptions.labelProp = 'name';
          templateOptions.valueProp = 'id';
          break;
        case 'date':
          type = 'input';
          templateOptions.type = 'date';
          break;
        case 'number':
          type = 'input';
          templateOptions.type = 'number';
          break;
        case 'email':
          type = 'input';
          templateOptions.type = 'email';
          break;
        case 'file':
          type = 'input';
          templateOptions.type = 'file';
          break;
        default:
          type = 'input';
          templateOptions.type = 'text';
          break;
      }

      return {
        key: column.field,
        type,
        templateOptions,
        className: 'col-sm-6',
      };
    });
  }
}
