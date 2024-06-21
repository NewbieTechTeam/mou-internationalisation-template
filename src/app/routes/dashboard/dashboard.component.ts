import { FormsDynamicComponent } from './../forms/dynamic/dynamic.component';
import { TablesRemoteDataComponent } from './../tables/remote-data/remote-data.component';
import { TablesKitchenSinkComponent } from './../tables/kitchen-sink/kitchen-sink.component';
import { TableComponent } from './../material/table/table.component';
import { DataSharerService } from '@shared';

import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  NgZone,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink, RouterModule } from '@angular/router';
import { MtxProgressModule } from '@ng-matero/extensions/progress';
import { Subscription } from 'rxjs';

import { SettingsService } from '@core';
import { BreadcrumbComponent } from '@shared';
import { DashboardService } from './dashboard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DashboardService],
  standalone: true,
  imports: [
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatListModule,
    MatGridListModule,
    MatTableModule,
    MatTabsModule,
    MtxProgressModule,
    BreadcrumbComponent,
    TableComponent,
    TablesKitchenSinkComponent,
    TablesRemoteDataComponent,
    RouterModule,
  ],
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(private router: Router) {}

  private readonly ngZone = inject(NgZone);
  private readonly settings = inject(SettingsService);
  private readonly dashboardSrv = inject(DashboardService);
  private readonly dataShare = inject(DataSharerService);

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = this.dashboardSrv.getData();

  messages = this.dashboardSrv.getMessages();
  numberOfAssignedMOU = 0;

  charts = this.dashboardSrv.getCharts();
  chart1: any;
  chart2: any;
  fullData: any;
  stats = this.dashboardSrv.getStats();

  stats2: any;
  notifySubscription!: Subscription;

  ngOnInit() {
    this.notifySubscription = this.settings.notify.subscribe(res => {
      console.log({ res });
    });

    this.dataShare.data$.subscribe((data: any) => {
      //this.exportedData = data;
      console.log({ data });
      console.log('length', data.length);
      this.fullData = data;
      this.numberOfAssignedMOU = data.length;
      console.log(this.stats);
      console.log('expired', this.calculateExpiredMoUs());

      console.log('percont', this.calculateSignedPerContinent());

      this.stats2 = [
        {
          title: 'Total Number of Signed',
          amount: `${this.numberOfAssignedMOU}`,
          progress: {
            value: `${(this.numberOfAssignedMOU / this.numberOfAssignedMOU) * 100}`,
          },
          color: 'bg-indigo-500',
        },
        {
          title: 'Total Number of Active',
          amount: `${this.calculateActiveMoUs()}`,
          progress: {
            value: `${(this.calculateActiveMoUs() / this.numberOfAssignedMOU) * 100}`,
          },
          color: 'bg-indigo-500',
        },
        {
          title: 'Total Number of Soon To Expire',
          amount: `${this.calculateSoonToExpireMoUs()}`,
          progress: {
            value: `${(this.calculateSoonToExpireMoUs() / this.numberOfAssignedMOU) * 100}`,
          },
          color: 'bg-indigo-500',
        },
        {
          title: 'Total Number of Expired',
          amount: `${this.calculateExpiredMoUs()}`,
          progress: {
            value: `${(this.calculateExpiredMoUs() / this.numberOfAssignedMOU) * 100}`,
          },
          color: 'bg-indigo-500',
        },
      ];

      this.calculateStats();
    });
  }

  calculateStats() {
    const today = new Date();

    // this.expiringSoonCount = this.exportedData.filter(mou => {
    //   //const expiryDate = new Date(mou.expiryDate);
    //   //const timeDiff = expiryDate.getTime() - today.getTime();
    //  // const daysDiff = timeDiff / (1000 * 3600 * 24);
    //  // return daysDiff <= 30; // Expiring within the next 30 days
    // }).length;
  }

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => this.initChart());
  }

  ngOnDestroy() {
    this.notifySubscription.unsubscribe();
  }

  initChart() {
    this.chart1 = new ApexCharts(document.querySelector('#chart1'), this.charts[0]);
    this.chart1?.render();
    this.chart2 = new ApexCharts(document.querySelector('#chart2'), this.charts[1]);
    this.chart2?.render();
  }

  navigateToForm() {
    this.router.navigate(['/forms/dynamic']);
  }

  calculateSignedPerContinent(): number {
    // Implement logic to calculate the number of signed MOUs per continent
    const continentCounts: { [key: string]: number } = this.fullData.reduce(
      (acc: any, mou: any) => {
        acc[mou.continent] = (acc[mou.continent] || 0) + 1;
        return acc;
      },
      {} as { [key: string]: number }
    );
    return Object.values(continentCounts).reduce((a: number, b: number) => a + b, 0);
  }

  calculateActiveMoUs(): number {
    return this.fullData.filter((mou: any) => mou.status && mou.status.toLowerCase() === 'active')
      .length;
  }

  calculateSoonToExpireMoUs(): number {
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);

    return this.fullData.filter((mou: any) => {
      if (mou.expiryDate) {
        const expiryDate = new Date(mou.expiryDate);
        return expiryDate > today && expiryDate <= nextWeek;
      }
      return false;
    }).length;
  }

  calculateExpiredMoUs(): number {
    const today = new Date();

    return this.fullData.filter((mou: any) => {
      if (mou.expiryDate) {
        const expiryDate = new Date(mou.expiryDate);
        return expiryDate < today;
      }
      return false;
    }).length;
  }
}
