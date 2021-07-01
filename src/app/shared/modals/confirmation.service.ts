import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AlertData, AlertModalComponent } from './alert-modal/alert-modal.component';
import { ConfirmationData, ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationService {

  constructor(private dialog: MatDialog) { }

  confirmar(data: ConfirmationData): Observable<any> {

    return this.dialog.open(ConfirmationModalComponent, {
      data,
      width: '500px',
      // desabilitar el cierre de la ventana, al clickar fuera
      disableClose: true,
    }).afterClosed();
  }

  informar(data: AlertData): Observable<any> {

    return this.dialog.open(AlertModalComponent, {
      data,
      width: '500px',
      disableClose: true,
    }).afterClosed();
  }

}
