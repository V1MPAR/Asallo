import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { TasksService, TodoState } from "../../tasks.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-add-task-dialog',
  templateUrl: './add-task-dialog.component.html',
  styleUrls: ['./add-task-dialog.component.scss']
})
export class AddTaskDialogComponent {

  public newTaskForm = this.formBuilder.group({
    state: [TodoState.TODO, [Validators.required]],
    name: ['', [Validators.required]],
    date: [''],
    createdAt: [new Date()],
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private snackBar: MatSnackBar, private formBuilder: FormBuilder, private tasksService: TasksService, private dialogRef: MatDialogRef<AddTaskDialogComponent>) {
    if (data) {
      this.newTaskForm.patchValue(data);
    }
  }

  public addTask(): void {
    if (this.newTaskForm.invalid) {
      return;
    }
    const task = {
      state: this.newTaskForm.value.state!,
      name: this.newTaskForm.value.name!,
      date: new Date(this.newTaskForm.value.date!),
      createdAt: this.newTaskForm.value.createdAt!,
    }
    this.tasksService.addTask(task);
    this.snackBar.open('Zadanie zostało dodane', 'Zamknij', { duration: 2000 });
    this.dialogRef.close();
  }

  public editTask(): void {
    if (this.newTaskForm.invalid) {
      return;
    }
    const task = {
      state: this.newTaskForm.value.state!,
      name: this.newTaskForm.value.name!,
      date: new Date(this.newTaskForm.value.date!),
      createdAt: this.newTaskForm.value.createdAt!,
    }
    this.tasksService.editTask(task);
    this.snackBar.open('Zadanie zostało zaktualizowane', 'Zamknij', { duration: 2000 });
    this.dialogRef.close();
  }

}
