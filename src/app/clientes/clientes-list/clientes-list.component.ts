import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConfirmationService } from 'src/app/shared/modals/confirmation.service';
import { ClienteListItem } from '../models/cliente-list-item';
import { ClientesModelService } from '../services/clientes-model.service';

@Component({
  selector: 'app-clientes-list',
  templateUrl: './clientes-list.component.html',
  styleUrls: ['./clientes-list.component.scss']
})
export class ClientesListComponent implements OnInit {

  clientes: ClienteListItem[] = [];

  displayedColumns: string[] = ['pos', 'nombre', 'dni', 'telefono', 'estadoCivilDesc', 'actions'];
  dataSource = new MatTableDataSource<ClienteListItem>([]);

  constructor(private clientesModel: ClientesModelService, private router: Router, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.clientesModel.getAll().subscribe(clientes => {
      console.log(clientes);
      this.dataSource.data = [...clientes];
      // Lo necesitamos para poder añadir un indice en cada iteración del array
      // this.dataSource.data = clientes.map((x, idx) => ({ ...x, pos: idx + 1 }));
    })
  }

  borrarClick(id: string): void {
    if (id) {
      this.confirmationService.informar(
        {
          titulo: 'Eliminar viaje',
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