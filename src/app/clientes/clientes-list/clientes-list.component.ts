import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/shared/alert-modal/alert.service';
import { Cliente } from '../models/cliente';
import { ClienteListItem } from '../models/cliente-list-item';
import { ClientesModelService } from '../services/clientes-model.service';

@Component({
  selector: 'app-clientes-list',
  templateUrl: './clientes-list.component.html',
  styleUrls: ['./clientes-list.component.scss']
})
export class ClientesListComponent implements OnInit {

  clientes: ClienteListItem[] = [];

  displayedColumns: string[] = ['nombre', 'dni', 'telefono', 'estadoCivilDesc', 'actions'];
  
  dataSource = new MatTableDataSource<ClienteListItem>([]);

  constructor(private clientesModel: ClientesModelService, private router: Router, private alertService: AlertService) { }

  ngOnInit(): void {
    this.clientesModel.getAll().subscribe(clientes => {
      console.log(clientes);
      this.dataSource.data = [...clientes];
    })
  }

  borrarClick(id: string): void {
    if (id) {
      this.alertService.confirmar(
        {
          titulo: 'Cliente borrado',
          confirmacion: 'true',
        }
      ).subscribe(x => {
        this.clientesModel.delete(id).subscribe(result => {
          if (result) {
            this.clientesModel.getAll().subscribe(result => {
            this.dataSource.data = result;
          })
          }
        })
      })
    }
  }

  editarClick(id: string): void {
    if (id) {
      this.router.navigate(['clientes/editar', id]);
    }
  }

}