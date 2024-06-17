import { Component, inject } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { ToastrService } from 'ngx-toastr';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { PageHeaderComponent } from '@shared';

import { getStorage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
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
  ],
})
export class FormsDynamicComponent {
  private readonly toast = inject(ToastrService);

  firestore: Firestore = inject(Firestore);

  columns4: any = [
    {
      header: 'Continent',
      field: 'continent',
      type: 'text',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: 'Country',
      field: 'country',
      type: 'text',
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
    {
      header: 'MOU PDF',
      field: 'mouPdf',
      type: 'file',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
  ];

  columns3: any[] = [
    {
      header: 'Continent',
      field: 'continent',
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
    {
      header: 'MOU PDF',
      field: 'mouPdf',
      type: 'file',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
  ];

  form = new FormGroup({});
  form3 = new FormGroup({});

  model = {};

  fields: FormlyFieldConfig[] = [
    {
      key: 'text',
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
          key: 'firstName',
          templateOptions: {
            label: 'First Name',
            required: true,
          },
        },
        {
          className: 'col-sm-6',
          type: 'input',
          key: 'lastName',
          templateOptions: {
            label: 'Last Name',
            required: true,
          },
          expressionProperties: {
            'templateOptions.disabled': '!model.firstName',
          },
        },
      ],
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-sm-6',
          type: 'input',
          key: 'street',
          templateOptions: {
            label: 'Street',
          },
        },
        {
          className: 'col-sm-3',
          type: 'combobox',
          key: 'cityId',
          templateOptions: {
            label: 'City',
            options: [
              { id: 1, name: '北京' },
              { id: 2, name: '上海' },
              { id: 3, name: '广州' },
              { id: 4, name: '深圳' },
            ],
            labelProp: 'name',
            valueProp: 'id',
            required: true,
            description: 'This is a custom field type.',
          },
        },
        {
          className: 'col-sm-3',
          type: 'input',
          key: 'zip',
          templateOptions: {
            type: 'number',
            label: 'Zip',
            max: 99999,
            min: 0,
            pattern: '\\d{5}',
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

  constructor() {
    //this.fields3 = this.columns3.map((column: any) => this.mapToFormlyField(column));
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
    };
  }
  submit() {
    if (this.form.valid) {
      this.showToast(this.model);
    }
  }

  async submit2() {
    if (this.form.valid) {
      try {
        const docRef = await addDoc(collection(this.firestore, 'forms'), this.model);
        this.toast.success('Document written');
      } catch (e: unknown) {
        if (e instanceof Error) {
          this.toast.error(`Error adding document: ${e.message}`);
        } else {
          this.toast.error(`Error adding document: ${String(e)}`);
        }
      }
    }
  }

  showToast(obj: any) {
    this.toast.success(JSON.stringify(obj));
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
