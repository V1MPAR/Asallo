import { Component } from '@angular/core';
import { TasksService } from "../../../../asallo/src/app/tasks/tasks.service";

@Component({
  selector: 'lib-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(private tasksService: TasksService) {
  }

  public addNewTask() {
    this.tasksService.createTask();
  }

}
