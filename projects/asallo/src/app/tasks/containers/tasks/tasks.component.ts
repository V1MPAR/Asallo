import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";
import { TasksService, TodoItemModel, TodoState } from "../../tasks.service";
import { MatSnackBar } from "@angular/material/snack-bar";

export enum Lists {
  TODO = 'cdk-drop-list-0',
  IN_PROGRESS = 'cdk-drop-list-1',
  DONE = 'cdk-drop-list-2',
}

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {

  todo: TodoItemModel[] = [];
  inProgress: TodoItemModel[] = [];
  done: TodoItemModel[] = [];

  public lists = Lists;
  public todoListEmpty: boolean = false;
  public inProgressListEmpty: boolean = false;
  public doneListEmpty: boolean = false;

  constructor(private tasksService: TasksService, private snackBar: MatSnackBar) {
    this.tasksService.todoLists.subscribe((lists) => {
      this.todo = lists.todo;
      this.inProgress = lists.in_progress;
      this.done = lists.done;
    });
  }

  public ngOnInit(): void {
  }

  drop(event: CdkDragDrop<any>, list: Lists) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    const movedItem = event.container.data[event.currentIndex];
    switch (event.container.id) {
      case Lists.TODO:
        this.todoListEmpty = event.container.data.length === 0;
        this.tasksService.changeState(movedItem, TodoState.TODO);
        break;
      case Lists.IN_PROGRESS:
        this.inProgressListEmpty = event.container.data.length === 0;
        this.tasksService.changeState(movedItem, TodoState.IN_PROGRESS);
        break;
      case Lists.DONE:
        this.doneListEmpty = event.container.data.length === 0;
        this.tasksService.changeState(movedItem, TodoState.DONE);
        break;
    }
    switch (event.previousContainer.id) {
      case Lists.TODO:
        this.todoListEmpty = event.previousContainer.data.length === 0;
        break;
      case Lists.IN_PROGRESS:
        this.inProgressListEmpty = event.previousContainer.data.length === 0;
        break;
      case Lists.DONE:
        this.doneListEmpty = event.previousContainer.data.length === 0;
        break;
    }
  }

  editTask(task: TodoItemModel) {
    this.tasksService.editTaskDialog(task);
  }

  deleteTask(task: TodoItemModel) {
    switch (task.state) {
      case TodoState.TODO:
        this.todo = this.todo.filter((t) => t.date !== task.date);
        this.todoListEmpty = this.todo.length === 0;
        break;
      case TodoState.IN_PROGRESS:
        this.inProgress = this.inProgress.filter((t) => t.date !== task.date);
        this.inProgressListEmpty = this.inProgress.length === 0;
        break;
      case TodoState.DONE:
        this.done = this.done.filter((t) => t.date !== task.date);
        this.doneListEmpty = this.done.length === 0;
        break;
    }
    this.tasksService.deleteTask(task);
    this.snackBar.open('Zadanie zostało usunięte', 'Zamknij', { duration: 2000 });
  }

}
