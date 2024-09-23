import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TurnosUserComponent } from './turnos-user.component';
import { ListAsistentesComponent } from './list-asistentes/list-asistentes.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { userGuard } from 'src/app/guard/user.guard';

const routes:Routes = [
  {
    path:'',
    component:TurnosUserComponent,    
  },
  {
    path:'listar',
    component:ListAsistentesComponent,
  }
]

@NgModule({
  declarations: [
    TurnosUserComponent,
    ListAsistentesComponent    
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TurnosUserModule { }
