import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { TurnosService } from 'src/app/services/turnos.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent {
  email:FormControl = new FormControl('',[Validators.required,Validators.email]);
  celular:FormControl = new FormControl('',[Validators.required,Validators.pattern(/^3[0-9]{9}$/)]);
  dataClient:any;

  clientForm:FormGroup = new FormGroup({
    email:this.email,
    celular:this.celular
  })

  constructor(@Inject(MAT_DIALOG_DATA) data:any,
              private matDialogRef:MatDialogRef<EditClientComponent>,
              private turnoService:TurnosService,
              private snackbarService:SnackbarService){
    this.dataClient = data.client;
    this.email.statusChanges.subscribe(status=>{
      this.email.markAllAsTouched();
    });
    this.celular.statusChanges.subscribe(status=>{
      this.celular.markAllAsTouched();
    });
  }

  ngOnInit(): void {

    this.email.setValue(this.dataClient.email);
    this.celular.setValue(this.dataClient.celular);    
  }
  save(){
    if(this.clientForm.invalid){
      this.clientForm.markAllAsTouched();
      return;
    }
    this.dataClient.email = this.email.getRawValue();
    this.dataClient.celular = this.celular.getRawValue();
    this.turnoService.putCliente(this.dataClient.idCliente,this.dataClient).subscribe(
      data=>{
        this.snackbarService.show('Cliente Actualizado','success');
        this.matDialogRef.close(
          {
            close:true
          }
        );
      },
      error=>{
        this.snackbarService.show(error.error.message,'error');
        this.matDialogRef.close(
          {
            close:false
          }
        );
      }      
    )    
    
  }

  cancel(){
    this.matDialogRef.close(
      {
        close:false
      }
    );
  }
}
