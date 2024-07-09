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
  chart3: any;

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
      if (data && data.length) {
        // Ensure data is not null or undefined and has a length property

        console.log({ data });
        this.fullData = data;
        console.log('fullData');
        console.log(this.fullData);

        this.initChart3();

        this.numberOfAssignedMOU = data.length;
        console.log(this.stats);
        console.log('expired', this.calculateExpiredMoUs());

        console.log('percont', this.groupByContinent());

        this.stats2 = [
          {
            title: 'TOTAL NUMBER OF SIGNED',
            amount: `${this.numberOfAssignedMOU}`,
            progress: {
              value: `${(this.numberOfAssignedMOU / this.numberOfAssignedMOU) * 100}`,
            },
            color: 'bg-indigo-500',
          },
          {
            title: 'TOTAL NUMBER OF ACTIVE',
            amount: `${this.calculateActiveMoUs()}`,
            progress: {
              value: `${(this.calculateActiveMoUs() / this.numberOfAssignedMOU) * 100}`,
            },
            color: 'bg-indigo-500',
          },
          {
            title: 'TOTAL NUMBER OF SOON TO EXPIRE',
            amount: `${this.calculateSoonToExpireMoUs()}`,
            progress: {
              value: `${(this.calculateSoonToExpireMoUs() / this.numberOfAssignedMOU) * 100}`,
            },
            color: 'bg-indigo-500',
          },
          {
            title: 'TOTAL NUMBER OF EXPIRED',
            amount: `${this.calculateExpiredMoUs()}`,
            progress: {
              value: `${(this.calculateExpiredMoUs() / this.numberOfAssignedMOU) * 100}`,
            },
            color: 'bg-indigo-500',
          },
        ];
      }
      //this.calculateStats();
    });
  }

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => this.initChart());
  }

  ngOnDestroy() {
    this.notifySubscription.unsubscribe();
  }

  initChart() {}

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

  groupByContinent(): { name: string; count: number }[] {
    // List of all possible continents
    const allContinents = [
      'Africa',
      'Asia',
      'Europe',
      'North America',
      'South America',
      'Australia',
      'Antarctica',
    ];

    // Initialize continent counts to zero
    const continentMap: { [key: string]: number } = {};
    allContinents.forEach(continent => {
      continentMap[continent] = 0;
    });

    // Count occurrences of each continent in the data
    this.fullData.forEach((item: any) => {
      const continent = item.continent;
      if (continent in continentMap) {
        continentMap[continent]++;
      }
    });

    // Convert the continent map to an array of { name, count } objects
    return Object.keys(continentMap).map(key => ({ name: key, count: continentMap[key] }));
  }

  initChart3() {
    const groupedData = this.groupByContinent();
    const chartOptions: any = {
      series: [
        {
          name: 'MoUs',
          data: groupedData.map(item => item.count),
        },
      ],
      chart: {
        type: 'bar',
        height: 350,
        toolbar: {
          show: true,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded',
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        categories: groupedData.map(item => item.name),
      },
      yaxis: {
        title: {
          text: 'Number of MoUs',
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter(val: number) {
            return `${val} MoUs`;
          },
        },
      },
      title: {
        text: 'IMOUs BY CONTINENT',
        align: 'left',
        style: {
          fontSize: '16px',
          fontWeight: 'bold',
          color: '#3f51b5',
        },
      },
      colors: ['#1E88E5', '#D32F2F', '#43A047', '#FBC02D', '#FB8C00', '#8E24AA', '#00ACC1'],
    };
    //this.chart3 = new ApexCharts(document.querySelector('#chart3'), chartOptions);
    //his.chart3.render();
    this.initChart3v2();
  }

  initChart3v2() {
    const groupedData = this.groupByContinent();
    console.log({ groupedData });

    const chartOptions: any = {
      series: [
        {
          name: 'iMOUs',
          data: groupedData.map(item => item.count),
        },
      ],
      chart: {
        type: 'bar',
        height: 350,
      },
      xaxis: {
        categories: groupedData.map(item => item.name),
      },

      colors: ['#3f51b5'], // Set bar color here
    };
    this.chart3 = new ApexCharts(document.querySelector('#chart3'), chartOptions);
    this.chart3.render();
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
