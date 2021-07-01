import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AlertData, AlertModalComponent } from './alert-modal.component';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private dialog: MatDialog) { }
  
  confirmar(data: AlertData): Observable<any> {

    return this.dialog.open(AlertModalComponent, {
      data,
      width: '500px',
      // desabilitar el cierre de la ventana, al clickar fuera
      disableClose: true,
    }).afterClosed();
  }
}

