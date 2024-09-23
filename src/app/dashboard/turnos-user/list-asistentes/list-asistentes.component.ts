import { Component, Inject, Query } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { TurnosService } from 'src/app/services/turnos.service';
import { VariablesService } from 'src/app/services/variables.service';

@Component({
  selector: 'app-list-asistentes',
  templateUrl: './list-asistentes.component.html',
  styleUrls: ['./list-asistentes.component.css']
})
export class ListAsistentesComponent {

  displayedColumns = ['id','nombres','anioNacimiento','nombreCliente','identificacion','actions'];
  pageSize = 8;
  pageIndex = 0;
  dataSource = new MatTableDataSource<any>([]);
  fechaSeleccionada:Date = new Date();
  idEvento:number = 0;
  asist:FormControl = new FormControl(false);
  constructor(@Inject(MAT_DIALOG_DATA) data:any,
              private turnosService:TurnosService,
              private variables:VariablesService,
              private snackBarService:SnackbarService
              
             )
  {
    if (data){  
      const [fecha, hora] = data.fecha.split(' ');

      // Dividir los componentes de la fecha
      const [dia, mes, anio] = fecha.split('-');

      // Crear una nueva fecha en el formato que entiende JavaScript (yyyy-mm-dd hh:mm)
      const fechaCorrecta = new Date(`${anio}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}T${hora}:00`);
      this.fechaSeleccionada = fechaCorrecta;
      this.idEvento = data.idEvento;
    }
  }

  ngOnInit(): void {
    this.loadData();
    
  }
  loadData(){

    const queryParams:any={
      fecha : this.fechaSeleccionada
    }
    this.turnosService.getAsistentes(queryParams).subscribe(
      (data:any)=>{
        this.dataSource = new MatTableDataSource<any>(data);
      },
      error=>{
        this.snackBarService.show(error.error.message,'error');
      }
    )
  }

  asistChange(element:any){
    const asiste:boolean = element.asiste;
    let asistencia:number=0;

    if (asiste){
      asistencia=0;
    }
    else{
      asistencia=1;
    }
    const body:any={
      asiste:asistencia
    }

    this.turnosService.asist(element.idAsistentesEventos,body).subscribe
    (
      data=>{
        this.loadData();
      },
      error=>{
        this.snackBarService.show(error.error.message)
      }
    )
  }
}
