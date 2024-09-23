import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TurnosComponent } from './turnos.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { RegistrarAsistenteComponent } from './registrar-asistente/registrar-asistente.component';
import { CrearAsistenteComponent } from './crear-asistente/crear-asistente.component';
import { ComponentsModule } from 'src/app/components/components.module';

const routes:Routes =[
  {
    path:'',
    component:TurnosComponent
  },
  {
    path:'asistentes',
    component:RegistrarAsistenteComponent
  }
]

@NgModule({
  declarations: [
    TurnosComponent,
    RegistrarAsistenteComponent,
    CrearAsistenteComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ComponentsModule    
  ]
})
export class TurnosModule { }
