import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { ChangeDetectionStrategy, AfterViewInit } from '@angular/core';

@Component({
  selector: 'formly-field-file',
  template: `
    <input
      type="file"
      #fileInput
      (change)="onFileSelect($event)"
      [multiple]="to.multiple"
      [formControl]="formControl"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,

  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule],
})
export class FormlyFieldFileComponent extends FieldType<FieldTypeConfig> implements AfterViewInit {
  @ViewChild('fileInput', { read: ElementRef, static: false })
  fileInput!: ElementRef<HTMLInputElement>;

  ngAfterViewInit() {
    if (this.formControl.value) {
      this.fileInput.nativeElement.value = this.formControl.value;
    }
  }
  onFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const files = Array.from(input.files);
      this.formControl.setValue(files);
    }
  }
}
