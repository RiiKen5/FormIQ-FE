import { Injectable, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from './modal/modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  constructor(public dialog: MatDialog) {}

  openTemplate(
    template: TemplateRef<any>,
    title: string = 'Modal',
    context: Record<string, any> = {}
  ) {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '600px',
      data: {
        title,
        bodyTemplate: template,
        context
      }
    });

    return dialogRef.afterClosed();
  }
}
