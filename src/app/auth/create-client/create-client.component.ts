import { Component } from '@angular/core';
import {  FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { TurnosService } from 'src/app/services/turnos.service';
import { VariablesService } from 'src/app/services/variables.service';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css']
})
export class CreateClientComponent {
  nombre1:FormControl = new FormControl('',[Validators.required]);
  nombre2:FormControl = new FormControl(null);
  apellido1:FormControl = new FormControl('',[Validators.required]);
  apellido2:FormControl = new FormControl(null);
  documento:FormControl = new FormControl('',[Validators.required]);
  idTipoDocumento:FormControl = new FormControl(0,[Validators.required]);
  email:FormControl = new FormControl('',[Validators.required,Validators.email]);
  celular:FormControl = new FormControl(3,[Validators.required,Validators.pattern(/^3[0-9]{9}$/)]);
  direccionResidencia:FormControl = new FormControl('',[Validators.required]);
  dataTipoDocumento:BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  fechaSeleccionada:FormControl = new FormControl('',[Validators.required]);
  fechaNacimiento:FormControl = new FormControl(new Date(),[Validators.required]);
  fecha:Date = new Date();

  clientForm:FormGroup = new FormGroup({
    nombre1:this.nombre1,
    apellido1:this.apellido1,
    documento:this.documento,
    idTipoDocumento:this.idTipoDocumento,
    email:this.email,
    celular:this.celular,
    fechaNacimiento:this.fechaNacimiento
  })
  constructor(private turnosService:TurnosService,
              private snackBarService:SnackbarService,
              private router:Router,
              private variableService:VariablesService
  ){
    this.clientForm.get('celular')?.statusChanges.subscribe(status=>{
      this.celular.markAllAsTouched();
    })
  }

  ngOnInit(): void {
    const anio = (this.fecha.getFullYear()).toString();
    const mes = (this.fecha.getMonth() + 1).toString();
    const dia = (this.fecha.getDate()).toString();
    this.fechaSeleccionada.setValue(`${dia}-${mes}-${anio}`);
    this.loadTypeDocument();    
  }

  loadTypeDocument(){
    this.turnosService.getTipoDocumento().subscribe(
      (data:any)=>{
        const result:any = [];

        data.element.forEach((element:any) => {
          result.push(
            {
              id:element.idReferencia,
              description:element.descripcion
            }
          )
        });

        this.dataTipoDocumento.next(result);
        this.idTipoDocumento.setValue(result[0].id);
      },
      error=>{
        this.snackBarService.show(error.error.message,'error')
      }
    )
  }

  save(){    
    if(this.clientForm.invalid){
      this.snackBarService.show('Debe digitar todos los campos','error');
      this.clientForm.markAllAsTouched();
      return;
    }    
    const [dia, mes, anio] = this.fechaSeleccionada.getRawValue().split('-').map((value: string) => parseInt(value, 10));
    const fecha = new Date(anio, mes - 1, dia);
    this.fecha.setFullYear(fecha.getFullYear(),fecha.getMonth(),fecha.getDate());
    this.clientForm.controls["fechaNacimiento"].setValue(fecha);    
    this.turnosService.postCliente(this.clientForm.value).subscribe(
      (data:any)=>{
        
        localStorage.setItem('data',JSON.stringify(data.element));
        localStorage.setItem('gran-type',data['grant-type']);
        localStorage.removeItem('registerClient');
        this.variableService.deserializeJson();
        this.snackBarService.show('Cliente creado','success');
        this.router.navigate(['./dashboard']);
      },
      error=>{
        this.snackBarService.show(error.error.message,'error');
      }
    )
  }

  cancel(){
    this.router.navigate(['./']);
    localStorage.removeItem('registerClient');
  }
}
