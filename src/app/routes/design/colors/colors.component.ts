import { Component, OnInit } from '@angular/core';
import { KeyValue, NgFor, NgIf, KeyValuePipe } from '@angular/common';

import { MAT_COLORS } from '@shared';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-design-colors',
  templateUrl: './colors.component.html',
  styleUrls: ['./colors.component.scss'],
  standalone: true,
  imports: [BreadcrumbComponent, NgFor, NgIf, KeyValuePipe],
})
export class DesignColorsComponent implements OnInit {
  colors: { key: string; value: any }[] = [];

  valueAscOrder(a: KeyValue<number, string>, b: KeyValue<number, string>): number {
    return a.value.localeCompare(b.value);
  }

  keyAscOrder(a: KeyValue<number, string>, b: KeyValue<number, string>): number {
    return a.key - b.key;
  }

  constructor() {}

  ngOnInit() {
    const colors: { [k: string]: any } = MAT_COLORS;
    for (const key of Object.keys(colors)) {
      this.colors.push({
        key,
        value: colors[key],
      });
    }
  }

  trackByColor(index: number, color: { key: string; value: any }): string {
    return color.key;
  }
}
