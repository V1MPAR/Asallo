import { Injectable } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { AddTaskDialogComponent } from "./components/add-task-dialog/add-task-dialog.component";
import { BehaviorSubject } from "rxjs";

export enum TodoState {
  TODO = 'todo',
  IN_PROGRESS = 'in_progress',
  DONE = 'done',
}

export interface TodoItemModel {
  name: string;
  state: TodoState;
  date: Date;
  createdAt: Date;
}
export interface TodoListsModel {
  todo: TodoItemModel[];
  in_progress: TodoItemModel[];
  done: TodoItemModel[];
}

@Injectable({
  providedIn: 'root',
})
export class TasksService {

  public todoLists: BehaviorSubject<TodoListsModel> = new BehaviorSubject<TodoListsModel>(this.getTodoLists());

  constructor(private dialog: MatDialog) {
    if (!this.getTodoLists()) {
      this.initTodoLists();
    }
  }

  getTodoLists(): TodoListsModel {
    return JSON.parse(localStorage.getItem('lists')!);
  }

  addTask(task: TodoItemModel): void {
    const lists = this.getTodoLists();
    lists[task.state].push(task);
    localStorage.setItem('lists', JSON.stringify(lists));
    this.todoLists.next(lists);
  }

  changeState(task: TodoItemModel, state: TodoState): void {
    const lists = this.getTodoLists();
    const taskIndex = lists[task.state].findIndex((t: any) => t.date === task.date);
    lists[task.state].splice(taskIndex, 1);
    task.state = state;
    lists[state].push(task);
    localStorage.setItem('lists', JSON.stringify(lists));
    this.todoLists.next(lists);
  }

  public createTask(): void {
    const dialogRef = this.dialog.open(AddTaskDialogComponent, {
      maxWidth: '80vw',
    });
  }

  public editTaskDialog(task: TodoItemModel): void {
    const dialogRef = this.dialog.open(AddTaskDialogComponent, {
      maxWidth: '80vw',
      data: task
    });
  }

  public editTask(task: TodoItemModel) {
    const lists = this.getTodoLists();
    const taskIndex = lists[task.state].findIndex((t: any) => t.createdAt === task.createdAt);
    lists[task.state][taskIndex] = task;
    localStorage.setItem('lists', JSON.stringify(lists));
    this.todoLists.next(lists);
  }

  public deleteTask(task: TodoItemModel) {
    const lists = this.getTodoLists();
    lists[task.state] = lists[task.state].filter((t: any) => t.createdAt != task.createdAt);
    localStorage.setItem('lists', JSON.stringify(lists));
    this.todoLists.next(lists);
  }

  private initTodoLists() {
    localStorage.setItem('lists', JSON.stringify({
      todo: [],
      in_progress: [],
      done: [],
    }));
  }

}
