import { Component, Inject, Optional, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { CrearAsistenteComponent } from '../crear-asistente/crear-asistente.component';
import { VariablesService } from 'src/app/services/variables.service';
import { TurnosService } from 'src/app/services/turnos.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-registrar-asistente',
  templateUrl: './registrar-asistente.component.html',
  styleUrls: ['./registrar-asistente.component.css']
})
export class RegistrarAsistenteComponent {

  displayedColumns = ['id','nombres','apellidos','actions'];

  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  pageSize = 8;
  pageIndex = 0;
  fechaSeleccionada:Date = new Date();
  idEvento:number = 0;
  turnos:any=[];
  isModal:boolean = false;
  constructor(private dialog:MatDialog,
              @Optional() @Inject(MAT_DIALOG_DATA) data:any,
              private variables:VariablesService,
              private turnosService:TurnosService,
              private snackBarService:SnackbarService,
              private matDialgoRef:MatDialogRef<RegistrarAsistenteComponent>
  ){   
    if (data){      
      this.displayedColumns = ['nombres','anioNacimiento','actions'];
      this.isModal = true;
      // Dividir la fecha y hora
      const [fecha, hora] = data.fecha.split(' ');

      // Dividir los componentes de la fecha
      const [dia, mes, anio] = fecha.split('-');

      // Crear una nueva fecha en el formato que entiende JavaScript (yyyy-mm-dd hh:mm)
      const fechaCorrecta = new Date(`${anio}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}T${hora}:00`);
      this.idEvento = data.idEvento;
      this.fechaSeleccionada = fechaCorrecta;
      if (data.turnos){
        this.turnos = data.turnos;
      }
    }
    else{
      this.displayedColumns = ['nombres','apellidos','fecha','hora','actions'];
      this.isModal = false;
      const fecha = new Date();
      this.fechaSeleccionada = fecha;
    }
  }

  ngOnInit(): void {    
    this.loadData();
  }

  loadData(){
    const queryParams = {
      fecha : this.fechaSeleccionada,
      modal: this.isModal
    };
    
    
    this.turnosService.getAsistentesByIdCliente(this.variables.idCliente.toString(),queryParams).subscribe(
      (data:any)=>{
        this.dataSource = new MatTableDataSource<any>(data);
        this.dataSource.paginator = this.paginator;
      },
      error=>{
        this.snackBarService.show(error.error.message,'error');
      }
    )
  }
  updateAsistente(event:any){    
    const dialogRef = this.dialog.open(CrearAsistenteComponent,{
      data:{
        nombreAsistente:event.nombreAsistente,
        apellidoAsistente:event.apellidoAsistente,
        turnos:this.turnos,
        fechaAsistencia:this.fechaSeleccionada
      },
      width:'80%',
      
      height: 'auto',
    });

    dialogRef.afterClosed().subscribe(
      data=>{
        if (data){
          const valueData = data.data;
          const body = {
            nombreAsistente: valueData.nombreAsistente,
            anioNacimiento: valueData.anioNacimiento,
            idCliente:this.variables.idCliente,
            fechaAsistencia:valueData.fechaSeleccionada,
            idEvento: this.idEvento
          }
          this.turnosService.putAsistentes(event.idAsistentesEventos,body).subscribe(
            data=>{
              this.snackBarService.show('Asistente Actualizado','success');
              this.loadData();
            },
            error=>{
              this.snackBarService.show(error.error.message,'error');
            }
          );
          this.loadData();
        }        
      },
      error=>{
        this.snackBarService.show(error.error.message,'error');
      }
    )
  }

  createAsistente(){
    const dialogRef = this.dialog.open(CrearAsistenteComponent,{
      width:'80%',
      
      height: 'auto',
    });

    dialogRef.afterClosed().subscribe(
      data=>{
        if (data){
          const valueData = data.data;
          const body = {
            nombreAsistente: valueData.nombreAsistente,
            anioNacimiento: valueData.anioNacimiento,
            idCliente:this.variables.idCliente,
            fechaAsistencia:this.fechaSeleccionada,
            idEvento: this.idEvento
          }

          this.turnosService.postAsistentes(body).subscribe(
            data=>{
              this.snackBarService.show('Asistente inscrito','success');
              this.loadData();
            },
            error=>{
              this.snackBarService.show(error.error.message,'error');
            }
          )
        }
      }
    )
  }

  deleteAsistente(element:any){
    this.turnosService.deleteAsistente(element.idAsistentesEventos).subscribe(
      data=>{
        this.snackBarService.show('Registro Eliminado','success');
        this.loadData();
      },
      error=>{
        this.snackBarService.show(error.error.message,'error')
      }
    )
  }  

  finalizeProcess(){    
    this.matDialgoRef.close(
      {
        fecha:this.fechaSeleccionada
      }
    );
  }
}
