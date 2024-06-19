import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule } from '@angular/router';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MtxDialog } from '@ng-matero/extensions/dialog';
import { MtxGridColumn, MtxGridModule } from '@ng-matero/extensions/grid';
import { TranslateService } from '@ngx-translate/core';
import { PageHeaderComponent } from '@shared';
import { TablesDataService } from '../data.service';
import { TablesKitchenSinkEditComponent } from './edit/edit.component';
import { getStorage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import {
  Firestore,
  collectionData,
  collection,
  addDoc,
  DocumentReference,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-kitchen-sink',
  templateUrl: './kitchen-sink.component.html',
  styleUrl: './kitchen-sink.component.scss',
  providers: [TablesDataService],
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatRadioModule,
    MtxGridModule,
    PageHeaderComponent,
    MatTableModule,
    RouterModule,
    MatFormFieldModule,
    MatIconModule,
    CommonModule,
    MatToolbarModule,
  ],
})
export class TablesKitchenSinkComponent implements OnInit {
  private readonly translate = inject(TranslateService);
  private readonly dataSrv = inject(TablesDataService);
  private readonly dialog = inject(MtxDialog);
  //firebase stuff
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  firestore: Firestore = inject(Firestore);

  items$: Observable<any[]> = new Observable<any[]>();
  itemCollection = collection(this.firestore, 'mous');
  constructor(private router: Router) {
    collectionData(this.itemCollection).subscribe((items: any[]) => {
      this.list = items;
      this.filteredData = items;
    });
  }
  //
  columns3: any = [
    {
      header: this.translate.stream('table_kitchen_sink.continent'),
      field: 'continent',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: this.translate.stream('table_kitchen_sink.countryOfPartnerInstitution'),
      field: 'countryOfPartnerInstitution',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: this.translate.stream('table_kitchen_sink.nameOfPartnerInstitution2'),
      field: 'nameOfPartnerInstitution',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: this.translate.stream('table_kitchen_sink.category'),
      field: 'category',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: this.translate.stream('table_kitchen_sink.purposeOfTheMoU'),
      field: 'purposeOfTheMoU',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: this.translate.stream('table_kitchen_sink.status'),
      field: 'status',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: this.translate.stream('table_kitchen_sink.highlights'),
      field: 'highlights',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: this.translate.stream('table_kitchen_sink.durationOfMoU'),
      field: 'durationOfMoU',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: this.translate.stream('table_kitchen_sink.startDate'),
      field: 'startDate',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: this.translate.stream('table_kitchen_sink.expiryDate'),
      field: 'expiryDate',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: this.translate.stream('table_kitchen_sink.responsibleTUTFaculty'),
      field: 'responsibleTUTFaculty',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },

    {
      header: this.translate.stream('table_kitchen_sink.responsibleTUTDepartment'),
      field: 'responsibleTUTDepartment',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: this.translate.stream('table_kitchen_sink.responsibleTUTOfficial'),
      field: 'responsibleTUTOfficial',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: this.translate.stream('table_kitchen_sink.responsibleTUTOfficiaTell'),
      field: 'responsibleTUTOfficiaTell',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },

    {
      header: this.translate.stream('table_kitchen_sink.responsibleTUTOfficiaEmail'),
      field: 'responsibleTUTOfficiaEmail',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: this.translate.stream('table_kitchen_sink.responsiblePatnerFaculty'),
      field: 'responsiblePatnerFaculty',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: this.translate.stream('table_kitchen_sink.responsiblePartnerDepartment'),
      field: 'responsiblePartnerDepartment',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: this.translate.stream('table_kitchen_sink.responsiblePatnerOfficial'),
      field: 'responsiblePatnerOfficial',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: this.translate.stream('table_kitchen_sink.responsiblePatnerOfficiaTell'),
      field: 'responsiblePatnerOfficiaTell',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: this.translate.stream('table_kitchen_sink.responsiblePartnerOfficiaEmail'),
      field: 'responsiblePartnerOfficiaEmail',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: this.translate.stream('table_kitchen_sink.partnerSignitory'),
      field: 'partnerSignitory',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },

    {
      header: this.translate.stream('table_kitchen_sink.tUTSigantory'),
      field: 'tUTSigantory',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
  ];

  list: any[] = [];
  isLoading = true;

  multiSelectable = true;
  rowSelectable = true;
  hideRowSelectionCheckbox = false;
  showToolbar = false;
  columnHideable = true;
  columnSortable = true;
  columnPinnable = true;
  rowHover = false;
  rowStriped = false;
  showPaginator = true;
  expandable = false;
  columnResizable = false;

  searchTerm: string = '';
  filteredData: any[] = [];
  ngOnInit() {
    this.list = this.dataSource.data;
    this.isLoading = false;
    //this.filteredData = this.dataSource.data;
  }

  applyFilter() {
    const searchTermLower = this.searchTerm.toLowerCase();
    this.filteredData = this.list.filter(item =>
      Object.values(item).some(val => String(val).toLowerCase().includes(searchTermLower))
    );
    console.log('this.filteredData');
    console.log(this.filteredData);
  }

  edit(value: any) {
    const dialogRef = this.dialog.originalOpen(TablesKitchenSinkEditComponent, {
      width: '600px',
      data: { record: value },
    });

    dialogRef.afterClosed().subscribe(() => console.log('The dialog was closed'));
  }

  delete(value: any) {
    this.dialog.alert(`You have deleted ${value.position}!`);
  }

  changeSelect(e: any) {
    console.log(e);
  }

  changeSort(e: any) {
    console.log(e);
  }

  enableRowExpandable() {
    this.columns3[0].showExpand = this.expandable;
  }

  updateCell() {
    this.list = this.list.map(item => {
      item.weight = Math.round(Math.random() * 1000) / 100;
      return item;
    });
  }

  updateList() {
    this.list = this.list.splice(-1).concat(this.list);
  }

  navigateToForm() {
    this.router.navigate(['/forms/dynamic']);
  }

  clearSearch() {
    this.searchTerm = '';
    this.applyFilter();
  }
}
