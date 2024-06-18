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
        { name: 'Afghanistan', code: 'AF' },
        { name: 'Åland Islands', code: 'AX' },
        { name: 'Albania', code: 'AL' },
        { name: 'Algeria', code: 'DZ' },
        { name: 'American Samoa', code: 'AS' },
        { name: 'AndorrA', code: 'AD' },
        { name: 'Angola', code: 'AO' },
        { name: 'Anguilla', code: 'AI' },
        { name: 'Antarctica', code: 'AQ' },
        { name: 'Antigua and Barbuda', code: 'AG' },
        { name: 'Argentina', code: 'AR' },
        { name: 'Armenia', code: 'AM' },
        { name: 'Aruba', code: 'AW' },
        { name: 'Australia', code: 'AU' },
        { name: 'Austria', code: 'AT' },
        { name: 'Azerbaijan', code: 'AZ' },
        { name: 'Bahamas', code: 'BS' },
        { name: 'Bahrain', code: 'BH' },
        { name: 'Bangladesh', code: 'BD' },
        { name: 'Barbados', code: 'BB' },
        { name: 'Belarus', code: 'BY' },
        { name: 'Belgium', code: 'BE' },
        { name: 'Belize', code: 'BZ' },
        { name: 'Benin', code: 'BJ' },
        { name: 'Bermuda', code: 'BM' },
        { name: 'Bhutan', code: 'BT' },
        { name: 'Bolivia', code: 'BO' },
        { name: 'Bosnia and Herzegovina', code: 'BA' },
        { name: 'Botswana', code: 'BW' },
        { name: 'Bouvet Island', code: 'BV' },
        { name: 'Brazil', code: 'BR' },
        { name: 'British Indian Ocean Territory', code: 'IO' },
        { name: 'Brunei Darussalam', code: 'BN' },
        { name: 'Bulgaria', code: 'BG' },
        { name: 'Burkina Faso', code: 'BF' },
        { name: 'Burundi', code: 'BI' },
        { name: 'Cambodia', code: 'KH' },
        { name: 'Cameroon', code: 'CM' },
        { name: 'Canada', code: 'CA' },
        { name: 'Cape Verde', code: 'CV' },
        { name: 'Cayman Islands', code: 'KY' },
        { name: 'Central African Republic', code: 'CF' },
        { name: 'Chad', code: 'TD' },
        { name: 'Chile', code: 'CL' },
        { name: 'China', code: 'CN' },
        { name: 'Christmas Island', code: 'CX' },
        { name: 'Cocos (Keeling) Islands', code: 'CC' },
        { name: 'Colombia', code: 'CO' },
        { name: 'Comoros', code: 'KM' },
        { name: 'Congo', code: 'CG' },
        { name: 'Congo, The Democratic Republic of the', code: 'CD' },
        { name: 'Cook Islands', code: 'CK' },
        { name: 'Costa Rica', code: 'CR' },
        { name: "Cote D'Ivoire", code: 'CI' },
        { name: 'Croatia', code: 'HR' },
        { name: 'Cuba', code: 'CU' },
        { name: 'Cyprus', code: 'CY' },
        { name: 'Czech Republic', code: 'CZ' },
        { name: 'Denmark', code: 'DK' },
        { name: 'Djibouti', code: 'DJ' },
        { name: 'Dominica', code: 'DM' },
        { name: 'Dominican Republic', code: 'DO' },
        { name: 'Ecuador', code: 'EC' },
        { name: 'Egypt', code: 'EG' },
        { name: 'El Salvador', code: 'SV' },
        { name: 'Equatorial Guinea', code: 'GQ' },
        { name: 'Eritrea', code: 'ER' },
        { name: 'Estonia', code: 'EE' },
        { name: 'Ethiopia', code: 'ET' },
        { name: 'Falkland Islands (Malvinas)', code: 'FK' },
        { name: 'Faroe Islands', code: 'FO' },
        { name: 'Fiji', code: 'FJ' },
        { name: 'Finland', code: 'FI' },
        { name: 'France', code: 'FR' },
        { name: 'French Guiana', code: 'GF' },
        { name: 'French Polynesia', code: 'PF' },
        { name: 'French Southern Territories', code: 'TF' },
        { name: 'Gabon', code: 'GA' },
        { name: 'Gambia', code: 'GM' },
        { name: 'Georgia', code: 'GE' },
        { name: 'Germany', code: 'DE' },
        { name: 'Ghana', code: 'GH' },
        { name: 'Gibraltar', code: 'GI' },
        { name: 'Greece', code: 'GR' },
        { name: 'Greenland', code: 'GL' },
        { name: 'Grenada', code: 'GD' },
        { name: 'Guadeloupe', code: 'GP' },
        { name: 'Guam', code: 'GU' },
        { name: 'Guatemala', code: 'GT' },
        { name: 'Guernsey', code: 'GG' },
        { name: 'Guinea', code: 'GN' },
        { name: 'Guinea-Bissau', code: 'GW' },
        { name: 'Guyana', code: 'GY' },
        { name: 'Haiti', code: 'HT' },
        { name: 'Heard Island and Mcdonald Islands', code: 'HM' },
        { name: 'Holy See (Vatican City State)', code: 'VA' },
        { name: 'Honduras', code: 'HN' },
        { name: 'Hong Kong', code: 'HK' },
        { name: 'Hungary', code: 'HU' },
        { name: 'Iceland', code: 'IS' },
        { name: 'India', code: 'IN' },
        { name: 'Indonesia', code: 'ID' },
        { name: 'Iran, Islamic Republic Of', code: 'IR' },
        { name: 'Iraq', code: 'IQ' },
        { name: 'Ireland', code: 'IE' },
        { name: 'Isle of Man', code: 'IM' },
        { name: 'Israel', code: 'IL' },
        { name: 'Italy', code: 'IT' },
        { name: 'Jamaica', code: 'JM' },
        { name: 'Japan', code: 'JP' },
        { name: 'Jersey', code: 'JE' },
        { name: 'Jordan', code: 'JO' },
        { name: 'Kazakhstan', code: 'KZ' },
        { name: 'Kenya', code: 'KE' },
        { name: 'Kiribati', code: 'KI' },
        { name: "Korea, Democratic People'S Republic of", code: 'KP' },
        { name: 'Korea, Republic of', code: 'KR' },
        { name: 'Kuwait', code: 'KW' },
        { name: 'Kyrgyzstan', code: 'KG' },
        { name: "Lao People'S Democratic Republic", code: 'LA' },
        { name: 'Latvia', code: 'LV' },
        { name: 'Lebanon', code: 'LB' },
        { name: 'Lesotho', code: 'LS' },
        { name: 'Liberia', code: 'LR' },
        { name: 'Libyan Arab Jamahiriya', code: 'LY' },
        { name: 'Liechtenstein', code: 'LI' },
        { name: 'Lithuania', code: 'LT' },
        { name: 'Luxembourg', code: 'LU' },
        { name: 'Macao', code: 'MO' },
        { name: 'Macedonia, The Former Yugoslav Republic of', code: 'MK' },
        { name: 'Madagascar', code: 'MG' },
        { name: 'Malawi', code: 'MW' },
        { name: 'Malaysia', code: 'MY' },
        { name: 'Maldives', code: 'MV' },
        { name: 'Mali', code: 'ML' },
        { name: 'Malta', code: 'MT' },
        { name: 'Marshall Islands', code: 'MH' },
        { name: 'Martinique', code: 'MQ' },
        { name: 'Mauritania', code: 'MR' },
        { name: 'Mauritius', code: 'MU' },
        { name: 'Mayotte', code: 'YT' },
        { name: 'Mexico', code: 'MX' },
        { name: 'Micronesia, Federated States of', code: 'FM' },
        { name: 'Moldova, Republic of', code: 'MD' },
        { name: 'Monaco', code: 'MC' },
        { name: 'Mongolia', code: 'MN' },
        { name: 'Montserrat', code: 'MS' },
        { name: 'Morocco', code: 'MA' },
        { name: 'Mozambique', code: 'MZ' },
        { name: 'Myanmar', code: 'MM' },
        { name: 'Namibia', code: 'NA' },
        { name: 'Nauru', code: 'NR' },
        { name: 'Nepal', code: 'NP' },
        { name: 'Netherlands', code: 'NL' },
        { name: 'Netherlands Antilles', code: 'AN' },
        { name: 'New Caledonia', code: 'NC' },
        { name: 'New Zealand', code: 'NZ' },
        { name: 'Nicaragua', code: 'NI' },
        { name: 'Niger', code: 'NE' },
        { name: 'Nigeria', code: 'NG' },
        { name: 'Niue', code: 'NU' },
        { name: 'Norfolk Island', code: 'NF' },
        { name: 'Northern Mariana Islands', code: 'MP' },
        { name: 'Norway', code: 'NO' },
        { name: 'Oman', code: 'OM' },
        { name: 'Pakistan', code: 'PK' },
        { name: 'Palau', code: 'PW' },
        { name: 'Palestinian Territory, Occupied', code: 'PS' },
        { name: 'Panama', code: 'PA' },
        { name: 'Papua New Guinea', code: 'PG' },
        { name: 'Paraguay', code: 'PY' },
        { name: 'Peru', code: 'PE' },
        { name: 'Philippines', code: 'PH' },
        { name: 'Pitcairn', code: 'PN' },
        { name: 'Poland', code: 'PL' },
        { name: 'Portugal', code: 'PT' },
        { name: 'Puerto Rico', code: 'PR' },
        { name: 'Qatar', code: 'QA' },
        { name: 'Reunion', code: 'RE' },
        { name: 'Romania', code: 'RO' },
        { name: 'Russian Federation', code: 'RU' },
        { name: 'RWANDA', code: 'RW' },
        { name: 'Saint Helena', code: 'SH' },
        { name: 'Saint Kitts and Nevis', code: 'KN' },
        { name: 'Saint Lucia', code: 'LC' },
        { name: 'Saint Pierre and Miquelon', code: 'PM' },
        { name: 'Saint Vincent and the Grenadines', code: 'VC' },
        { name: 'Samoa', code: 'WS' },
        { name: 'San Marino', code: 'SM' },
        { name: 'Sao Tome and Principe', code: 'ST' },
        { name: 'Saudi Arabia', code: 'SA' },
        { name: 'Senegal', code: 'SN' },
        { name: 'Serbia and Montenegro', code: 'CS' },
        { name: 'Seychelles', code: 'SC' },
        { name: 'Sierra Leone', code: 'SL' },
        { name: 'Singapore', code: 'SG' },
        { name: 'Slovakia', code: 'SK' },
        { name: 'Slovenia', code: 'SI' },
        { name: 'Solomon Islands', code: 'SB' },
        { name: 'Somalia', code: 'SO' },
        { name: 'South Africa', code: 'ZA' },
        { name: 'South Georgia and the South Sandwich Islands', code: 'GS' },
        { name: 'Spain', code: 'ES' },
        { name: 'Sri Lanka', code: 'LK' },
        { name: 'Sudan', code: 'SD' },
        { name: 'Suriname', code: 'SR' },
        { name: 'Svalbard and Jan Mayen', code: 'SJ' },
        { name: 'Swaziland', code: 'SZ' },
        { name: 'Sweden', code: 'SE' },
        { name: 'Switzerland', code: 'CH' },
        { name: 'Syrian Arab Republic', code: 'SY' },
        { name: 'Taiwan, Province of China', code: 'TW' },
        { name: 'Tajikistan', code: 'TJ' },
        { name: 'Tanzania, United Republic of', code: 'TZ' },
        { name: 'Thailand', code: 'TH' },
        { name: 'Timor-Leste', code: 'TL' },
        { name: 'Togo', code: 'TG' },
        { name: 'Tokelau', code: 'TK' },
        { name: 'Tonga', code: 'TO' },
        { name: 'Trinidad and Tobago', code: 'TT' },
        { name: 'Tunisia', code: 'TN' },
        { name: 'Turkey', code: 'TR' },
        { name: 'Turkmenistan', code: 'TM' },
        { name: 'Turks and Caicos Islands', code: 'TC' },
        { name: 'Tuvalu', code: 'TV' },
        { name: 'Uganda', code: 'UG' },
        { name: 'Ukraine', code: 'UA' },
        { name: 'United Arab Emirates', code: 'AE' },
        { name: 'United Kingdom', code: 'GB' },
        { name: 'United States', code: 'US' },
        { name: 'United States Minor Outlying Islands', code: 'UM' },
        { name: 'Uruguay', code: 'UY' },
        { name: 'Uzbekistan', code: 'UZ' },
        { name: 'Vanuatu', code: 'VU' },
        { name: 'Venezuela', code: 'VE' },
        { name: 'Viet Nam', code: 'VN' },
        { name: 'Virgin Islands, British', code: 'VG' },
        { name: 'Virgin Islands, U.S.', code: 'VI' },
        { name: 'Wallis and Futuna', code: 'WF' },
        { name: 'Western Sahara', code: 'EH' },
        { name: 'Yemen', code: 'YE' },
        { name: 'Zambia', code: 'ZM' },
        { name: 'Zimbabwe', code: 'ZW' },
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
      type: 'text',

      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: 'Purpose of the IMOU',
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
        { id: 2, name: 'Expired' },
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
      header: 'Duration of IMOU',
      field: 'durationOfMou',
      type: 'select',
      options: [
        { id: 1, name: 1 },
        { id: 2, name: 2 },
        { id: 3, name: 3 },
        { id: 4, name: 4 },
        { id: 5, name: 5 },
      ],
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
            label: 'Purpose Of The IMOU',
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
                  const docRef = await addDoc(collection(this.firestore, 'mous'), this.model);
                  console.log('Document written with ID: ', docRef.id);
                  this.toast.success('IMOU ADDED');
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
