import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { clientGuard } from '../guard/client.guard';
import { userGuard } from '../guard/user.guard';

const routes:Routes = [
  {
    path:'',
    component:DashboardComponent,
    children:[
      {
        path:'',
        loadChildren:()=> import('./turnos/turnos.module').then(m=>m.TurnosModule),
        canActivate:[clientGuard]
      },
      {
        path:'user',
        loadChildren:()=> import('./turnos-user/turnos-user.module').then(m=>m.TurnosUserModule),        
        canActivate:[userGuard]
      }
    ]
  }
  
]

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class DashboardModule { }
