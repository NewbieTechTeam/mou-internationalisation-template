import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';

export interface Task {
  name: string;
  completed: boolean;
  subtasks?: Task[];
}

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  standalone: true,
  imports: [BreadcrumbComponent, MatCardModule, MatCheckboxModule, NgFor, FormsModule],
})
export class CheckboxComponent {
  tasks: Task[] = [
    {
      name: 'Reminders',
      completed: false,
      subtasks: [
        { name: 'Cook Dinner', completed: false },
        { name: 'Read the Material Design Spec', completed: false },
        { name: 'Upgrade Application to Angular', completed: false },
      ],
    },
    {
      name: 'Groceries',
      completed: false,
      subtasks: [
        { name: 'Organic Eggs', completed: false },
        { name: 'Protein Powder', completed: false },
        { name: 'Almond Meal Flour', completed: false },
      ],
    },
  ];

  allComplete(task: Task): boolean {
    const subtasks = task.subtasks;

    return task.completed || (subtasks != null && subtasks.every(t => t.completed));
  }

  someComplete(tasks: Task[]): boolean {
    const numComplete = tasks.filter(t => t.completed).length;
    return numComplete > 0 && numComplete < tasks.length;
  }

  setAllCompleted(tasks: Task[], completed: boolean) {
    tasks.forEach(t => (t.completed = completed));
  }
}
