import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EditClientComponent } from 'src/app/components/edit-client/edit-client.component';
import { HabeasDataComponent } from 'src/app/components/habeas-data/habeas-data.component';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { TurnosService } from 'src/app/services/turnos.service';
import { VariablesService } from 'src/app/services/variables.service';

@Component({
  selector: 'app-auth-client',
  templateUrl: './auth-client.component.html',
  styleUrls: ['./auth-client.component.css']
})
export class AuthClientComponent {
  documento = new FormControl(null,[Validators.required])
  emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  celularPattern = /^[3][0-9]{9}$/;
  constructor(private turnoService:TurnosService,
              private snackBarService:SnackbarService,
              private router:Router,
              private variables:VariablesService,
              private dialog:MatDialog,
  ){

  }
  clienteForm = new FormGroup({
    documento:this.documento
  });

  ngOnInit(): void {
    this.variables.deleteLocalVaribles();
    
  }

  login(){
    if (this.clienteForm.invalid){
      this.clienteForm.markAllAsTouched();
      this.snackBarService.show('Digite un documento','error');
      return;
    }
    this.turnoService.getCliente(this.documento.getRawValue()!).subscribe(
      (data:any)=>{        
        if (data.element){
          localStorage.setItem('data',JSON.stringify(data.element));
          localStorage.setItem('gran-type',data['grant-type']);
          this.variables.deserializeJson();
          const correo = this.emailPattern.test(data.element.email);
          const celular = this.celularPattern.test(data.element.celular);
          if (!correo || !celular){
            const dialogRef = this.dialog.open(EditClientComponent,
              {
                data:{
                  client:data.element
                }
              }
            );
            dialogRef.afterClosed().subscribe(data=>
              {
                if (data.close){
                  this.router.navigate(['./dashboard']);
                }                
              }
            );
          }
          else{
            this.router.navigate(['./dashboard']);
          }          
        }
        else{
          this.snackBarService.show('Cliente no esta registrado','error');
          const dialogRef = this.dialog.open(HabeasDataComponent,{
          });

          dialogRef.afterClosed().subscribe(
            data=>{
              if (data.habeas){
                localStorage.setItem('registerClient',data.habeas);
                this.router.navigate(['./registerClient']);
              }
              else{
                localStorage.removeItem('registerClient');
              }
            }
          )
        }
      }
      ,error=>{
        this.snackBarService.show(error.error.message,'error');
      }
      )
  }
}
