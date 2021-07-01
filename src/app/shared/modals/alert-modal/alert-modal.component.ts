import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmationData } from '../confirmation-modal/confirmation-modal.component';

export interface AlertData {
  titulo?: string;
  confirmacion?: string;
}

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.scss']
})
export class AlertModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: ConfirmationData) { }

  ngOnInit(): void {
  }



}
