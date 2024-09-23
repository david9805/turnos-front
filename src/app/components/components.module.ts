import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DirectiveModule } from '../directive/directive.module';
import { MaterialModule } from '../material/material.module';
import { CustomSnackbarComponent } from './custom-snackbar/custom-snackbar.component';
import { HabeasDataComponent } from './habeas-data/habeas-data.component';
import { EditClientComponent } from './edit-client/edit-client.component';
import { AlertsComponent } from './alerts/alerts.component';



@NgModule({
  declarations: [
    InputComponent,
    CustomSnackbarComponent,
    HabeasDataComponent,
    EditClientComponent,
    AlertsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DirectiveModule,
    MaterialModule    
  ],
  exports:[
    InputComponent
  ]
})
export class ComponentsModule { }
