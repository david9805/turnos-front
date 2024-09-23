import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import {  RouterModule, Routes } from '@angular/router';
import { AuthClientComponent } from './auth-client/auth-client.component';
import { AuthUserComponent } from './auth-user/auth-user.component';
import { CreateClientComponent } from './create-client/create-client.component';
import { ComponentsModule } from '../components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { registerClientGuard } from '../guard/registerClient.guard';


const routes:Routes = [
  {
    path:'',
    component:AuthClientComponent
  },
  {
    path:'registerClient',
    component:CreateClientComponent,
    canActivate:[registerClientGuard]
  },
  {
    path:'user',
    component:AuthUserComponent
  }
]
@NgModule({
  declarations: [
    AuthComponent,
    AuthClientComponent,
    AuthUserComponent,
    CreateClientComponent    
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    ComponentsModule,
    MaterialModule,
    FormsModule
  ]
})
export class AuthModule { }
