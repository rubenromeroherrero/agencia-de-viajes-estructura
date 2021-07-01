import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'src/app/shared/confirmation-modal/confirmation.service';
import { IdValor } from '../../models/id-valor';
import { Viaje } from '../models/viaje';
import { ViajesFilter } from '../models/viajes-filter';
import { ViajesModelService } from '../services/viajes-model.service';

@Component({
  selector: 'app-viajes-list',
  templateUrl: './viajes-list.component.html',
  styleUrls: ['./viajes-list.component.scss']
})
export class ViajesListComponent implements OnInit {

  tiposDeViaje: IdValor[] = [];
  viajes: Viaje[] = [];

  mostrarTarjetas = false;

  // dialog -> permite levantar ventanas modales de confirmación
  constructor(private viajesModel: ViajesModelService, private router: Router, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.viajesModel.getViajes().subscribe(result => {
      this.viajes = result;
    });
    this.tiposDeViaje = this.viajesModel.getTiposDeViajes();
  }

  cambiarVistaClick() {
    this.mostrarTarjetas = !this.mostrarTarjetas;
  }

  searchClick(filtro: ViajesFilter): void {
    if (filtro) {
      this.viajesModel.buscar(filtro).subscribe(result => {
        this.viajes = result;
      });
    }
  }

  borrarClick(id: string): void {
    if (id) {
      this.confirmationService.confirmar(
        {
        titulo: 'Eliminar viaje',
        pregunta: '¿Seguro que quieres eliminar el viaje?',
        opcionSi: 'Eliminar',
        opcionNo: 'Cancelar'
        }
      ).subscribe(x => {
        // si es true
        if (x) {
          this.viajesModel.eliminar(id).subscribe(result => {
            this.viajesModel.getViajes().subscribe(result => {
            this.viajes = result;
            });
          })
        }
      })
    }
  }

  editarClick(id: string): void {
    if (id) {
      this.router.navigate(['viajes/editar',id]);
    }
  }
}
