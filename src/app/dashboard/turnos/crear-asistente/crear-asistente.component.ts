import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { TurnosService } from 'src/app/services/turnos.service';

@Component({
  selector: 'app-crear-asistente',
  templateUrl: './crear-asistente.component.html',
  styleUrls: ['./crear-asistente.component.css']
})
export class CrearAsistenteComponent {
  nombres:FormControl = new FormControl('',[Validators.required]);
  anioNacimiento:FormControl = new FormControl('',[Validators.required,Validators.min(2008),Validators.max(2020)]);
  fechaSeleccionada:FormControl<Date> = new FormControl<Date>(new Date(), { nonNullable: true });
  horaSeleccionada : FormControl = new FormControl ();
  selected: Date = new Date();
  minDate:Date = new Date();

  asistenteForm = new FormGroup({
    nombreAsistente:this.nombres,
    anioNacimiento:this.anioNacimiento,
    fechaSeleccionada:this.fechaSeleccionada
  });

  dataTurnosBehavior: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  dataTurnos:any = [];

  info:any;
  edit:boolean = false;

  turnos:any = [];

  constructor(private dialogRef:MatDialogRef<CrearAsistenteComponent>,
              private turnosService:TurnosService,
              private snackBarService:SnackbarService,
              @Inject(MAT_DIALOG_DATA) data:any
  ){    
    if (data){
      this.info = data;      
      this.selected =new Date(this.info.fechaAsistencia);
      const hora = this.info.fechaAsistencia.getHours();
      const minutos = this.info.fechaAsistencia.getMinutes().toString() === '0' ? this.info.fechaAsistencia.getMinutes().toString() +'0' : this.info.fechaAsistencia.getMinutes().toString();
      const horaHoy = `${hora}:${minutos}`; 
      this.horaSeleccionada.setValue(horaHoy);
      // if(this.info.turnos){
      //   this.turnos = this.info.turnos
      // }
      this.dateChange();
      this.loadData();      
    }
  }

  dateChange(){
    
    const fecha = new Date(this.selected);
    const fechaHoy = new Date();

    const anioFecha = fecha.getFullYear();
    const mesFecha = fecha.getMonth() +1;
    const diaFecha = fecha.getDate();

    const anioFechaHoy = fechaHoy.getFullYear();
    const mesFechaHoy = fechaHoy.getMonth() +1;
    const diaFechaHoy = fechaHoy.getDate();

    const fechaNumber = anioFecha * 10000 + mesFecha *100 + diaFecha;
    const fechaNumberHoy = anioFechaHoy * 10000 + mesFechaHoy *100 + diaFechaHoy;
    let hours,minute = 0;
    if (fechaNumber === fechaNumberHoy){
      hours = fechaHoy.getHours();
      minute = fechaHoy.getMinutes();
    }
    else{
      [hours,minute] = this.horaSeleccionada.getRawValue().split(':').map(Number);
    }    

    fecha.setHours(hours,minute);

    const queryParams={
      fecha: fecha
    }

    
    this.turnosService.getEventos(queryParams).subscribe(
      (data:any)=>{        
        this.turnos = data.turnos;        
        this.loadData();
      },
      error =>{
        this.snackBarService.show(error.error.message,'error');
      }
    )
  }

  loadData(){
    if (this.info){
      this.dataTurnos = [];
      this.edit = true;
      
      this.turnos.forEach((element:any) => {
        this.dataTurnos.push({
          id:element.turno,
          description:element.turno,
        })
      });      
      this.dataTurnosBehavior.next(this.dataTurnos); 
      this.nombres.setValue(this.info.nombreAsistente);
      this.anioNacimiento.setValue(this.info.anioNacimiento);

    }
  }

  save(){
    if (this.asistenteForm.invalid) {
      this.asistenteForm.markAllAsTouched();
      return;
    }

    if(this.edit){
      const [hora,minuto] = this.horaSeleccionada.getRawValue().split(':').map(Number);      

      const fecha = new Date(this.selected);
      fecha.setHours(hora,minuto);
      this.fechaSeleccionada.setValue(new Date(fecha));
      
    }

    this.dialogRef.close({
      data:this.asistenteForm.value,
      edit:this.edit
    })
  }

  cancel(){
    this.dialogRef.close();
  }
}
