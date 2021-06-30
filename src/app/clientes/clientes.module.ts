import { NgModule } from '@angular/core';
import { ClientesRoutingModule } from './clientes-routing.module';
import { ClientesListComponent } from './clientes-list/clientes-list.component';
import { ClientesEditComponent } from './clientes-edit/clientes-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    ClientesListComponent,
    ClientesEditComponent,
  ],
  imports: [
    ClientesRoutingModule,
    SharedModule
  ]
})
export class ClientesModule { }
