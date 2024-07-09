import { DataSharerService } from '@shared';
import { Component, inject, OnInit } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-notification',
  template: `
    <button mat-icon-button [matMenuTriggerFor]="menu">
      <mat-icon [matBadge]="soonToExpireMoUs" matBadgeColor="warn" aria-hidden="false"
        >notifications</mat-icon
      >
    </button>

    <mat-menu #menu="matMenu">
      <mat-nav-list>
        @for (message of messages; track message) {
          <mat-list-item>
            <mat-icon class="m-x-16" matListItemIcon>info</mat-icon>
            <a matListItemTitle>{{ message }}</a>
          </mat-list-item>
        }
      </mat-nav-list>
    </mat-menu>
  `,
  standalone: true,
  imports: [MatBadgeModule, MatButtonModule, MatIconModule, MatListModule, MatMenuModule],
})
export class NotificationComponent implements OnInit {
  messages = ['Soon To Expire IMOUs'];
  private readonly dataShare = inject(DataSharerService);
  fullData: any;
  soonToExpireMoUs = 0;

  ngOnInit() {
    this.dataShare.data$.subscribe((data: any) => {
      if (data && data.length > 0) {
        this.fullData = data;
        console.log('cacl');

        console.log(this.calculateSoonToExpireMoUs());

        this.soonToExpireMoUs = this.calculateSoonToExpireMoUs();
      } else {
        this.soonToExpireMoUs = 0;
      }
    });
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
}
