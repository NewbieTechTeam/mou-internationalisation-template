import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule } from '@angular/router';
import {
  Component,
  OnInit,
  AfterViewInit,
  inject,
  ChangeDetectorRef,
  ViewChild,
  TemplateRef,
} from '@angular/core';
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
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { DataSharerService } from '@shared';

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
export class TablesKitchenSinkComponent implements OnInit, AfterViewInit {
  private readonly translate = inject(TranslateService);
  private readonly dataSrv = inject(TablesDataService);
  private readonly dialog = inject(MtxDialog);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly dataShare = inject(DataSharerService);

  //firebase stuff
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  firestore: Firestore = inject(Firestore);

  items$: Observable<any[]> = new Observable<any[]>();
  itemCollection = collection(this.firestore, 'cleanedsampledata5');

  columns3: MtxGridColumn[] = [];

  @ViewChild('viewButton', { static: true }) viewButton!: TemplateRef<any>;

  constructor(private router: Router) {
    collectionData(this.itemCollection).subscribe((items: any[]) => {
      this.list = items;
      this.exportData(this.list);
      this.filteredData = items;
      this.isLoading = false; // Set loading to false once data is loaded
      this.cdr.detectChanges(); // Trigger change detection
    }),
      (err: any) => {
        console.log({ err });
        this.isLoading = false; // Set loading to false on error
      };
  }

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
  //Search params
  searchTerm: string = '';
  filteredData: any[] = [];

  ngOnInit() {
    this.list = this.dataSource.data;
    this.isLoading = false;
  }

  ngAfterViewInit() {
    this.columns3 = [
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
        field: 'durationOfMou',
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
        field: 'responsibleTutFaculty',
        sortable: true,
        minWidth: 100,
        width: '100px',
      },

      {
        header: this.translate.stream('table_kitchen_sink.responsibleTUTDepartment'),
        field: 'responsibleTutDepartment',
        sortable: true,
        minWidth: 100,
        width: '100px',
      },
      {
        header: this.translate.stream('table_kitchen_sink.responsibleTUTOfficial'),
        field: 'responsibleTutOfficial',
        sortable: true,
        minWidth: 100,
        width: '100px',
      },
      {
        header: this.translate.stream('table_kitchen_sink.responsibleTUTOfficiaTell'),
        field: 'responsibleTutOfficialTelephone',
        sortable: true,
        minWidth: 100,
        width: '100px',
      },

      {
        header: this.translate.stream('table_kitchen_sink.responsibleTUTOfficiaEmail'),
        field: 'responsibleTutOfficialEmail',
        sortable: true,
        minWidth: 100,
        width: '100px',
      },
      {
        header: this.translate.stream('table_kitchen_sink.responsiblePatnerFaculty'),
        field: 'responsiblePartnerFaculty',
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
        field: 'responsiblePartnerOfficial',
        sortable: true,
        minWidth: 100,
        width: '100px',
      },
      {
        header: this.translate.stream('table_kitchen_sink.responsiblePatnerOfficiaTell'),
        field: 'responsiblePartnerOfficialTelephone',
        sortable: true,
        minWidth: 100,
        width: '100px',
      },
      {
        header: this.translate.stream('table_kitchen_sink.responsiblePartnerOfficiaEmail'),
        field: 'responsiblePartnerOfficialEmail',
        sortable: true,
        minWidth: 100,
        width: '100px',
      },
      {
        header: this.translate.stream('table_kitchen_sink.partnerSignitory'),
        field: 'partnerSignatory',
        sortable: true,
        minWidth: 100,
        width: '100px',
      },
      // {
      //   header: this.translate.stream('table_kitchen_sink.mouPdf'),
      //   field: 'downloadURL',
      //   // cellTemplate: this.viewButton,
      //   sortable: false,
      //   minWidth: 100,
      //   width: '100px',
      //   maxWidth: 100,
      // },
      {
        header: this.translate.stream('table_kitchen_sink.tUTSigantory'),
        field: 'tutSignatory',
        sortable: true,
        minWidth: 100,
        width: '100px',
      },
    ];

    // Trigger change detection to update the view with the new columns
    this.cdr.detectChanges();
  }

  viewFile(pdfLink: string) {
    window.open(pdfLink, '_blank');
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

  getSafeUrl(pdfLink: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(pdfLink);
  }

  groupByContinent(): { [key: string]: any[] } {
    return this.list.reduce(
      (acc, item) => {
        const continent = item.continent || 'Unknown';
        if (!acc[continent]) {
          acc[continent] = [];
        }
        acc[continent].push(item);
        return acc;
      },
      {} as { [key: string]: any[] }
    );
  }

  // Expiring Soon (within the next month)
  expiringSoon(): any[] {
    const oneMonthFromNow = new Date();
    oneMonthFromNow.setMonth(oneMonthFromNow.getMonth() + 1);
    return this.list.filter(item => {
      const expiryDate = new Date(item.expiryDate);
      return expiryDate <= oneMonthFromNow;
    });
  }

  numberOfAssignedMOU(): number {
    return this.list.filter(item => item.assigned).length;
  }

  exportData(data: any) {
    this.dataShare.setData(data);
  }
}
