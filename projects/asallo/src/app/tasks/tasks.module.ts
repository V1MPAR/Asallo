import { NgModule } from '@angular/core';

import { TasksRouting } from './tasks.routing';
import { CommonModule } from "@angular/common";
import { TasksComponent } from "./containers/tasks/tasks.component";
import { NavbarModule } from "../../../../ui/src/lib/navbar/navbar.module";
import { DragDropListComponent } from "../../../../ui/src/lib/drag-drop-list/drag-drop-list.component";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { AddTaskDialogComponent } from './components/add-task-dialog/add-task-dialog.component';
import { MatDialogModule } from "@angular/material/dialog";
import { MatRadioModule } from "@angular/material/radio";
import { ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";

@NgModule({
  declarations: [
    TasksComponent,
    AddTaskDialogComponent,
  ],
  imports: [
    NavbarModule,
    DragDropListComponent,
    TasksRouting,
    CommonModule,
    DragDropModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [],
  bootstrap: [TasksComponent]
})
export class TasksModule { }
