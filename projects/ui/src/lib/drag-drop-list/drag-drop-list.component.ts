import { Component, Input } from '@angular/core';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";
import { NgFor } from "@angular/common";

@Component({
  selector: 'lib-drag-drop-list',
  templateUrl: './drag-drop-list.component.html',
  styleUrls: ['./drag-drop-list.component.scss'],
  standalone: true,
  imports: [CdkDropList, NgFor, CdkDrag],
})
export class DragDropListComponent {

  @Input()
  public cdkDropListData: any[] = [];
  @Input()
  public cdkDropListConnectedTo: any = '';

  drop(event: CdkDragDrop<string[]>) {
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
  }

}
