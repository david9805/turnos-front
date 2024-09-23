import { Component, ElementRef, Renderer2 } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { TurnosService } from 'src/app/services/turnos.service';
import { RegistrarAsistenteComponent } from './registrar-asistente/registrar-asistente.component';
import { interval, Subscription, timer } from 'rxjs';
import { Datepicker } from 'flowbite';
import { AlertsComponent } from 'src/app/components/alerts/alerts.component';
import { VariablesService } from 'src/app/services/variables.service';


@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.css']
})
export class TurnosComponent {

  constructor(private turnosService:TurnosService,
              private snackBarService:SnackbarService,
              private dialog:MatDialog,
              private el: ElementRef,
              private variableService:VariablesService
  ){    
    this.minDate = new Date().toString();
  }

  timerSubscription: Subscription | null = null;
  private _fechaSeleccionada = '';
  get fechaSeleccionada() {
    return this._fechaSeleccionada;
  }
  set fechaSeleccionada(value) {
    this._fechaSeleccionada = value;
  }
  fecha:Date = new Date();
  minDate:string = '';

  turnos:any = [];

  pageIndex:number=0;
  pageSize:number=16;
  paginatedItems:any=[];
  idEvento:number=0;

  ngOnInit(): void { 
    this.loadData();  
    this.startTimer();

    
  }
ngAfterViewInit(): void {
  const input = this.el.nativeElement.querySelector('#datepicker-format');
  // Inicializa el datepicker cuando se enfoca el input
  const datepickerEl = document.getElementById('datepicker-format');
  const datepicker = new Datepicker(datepickerEl, {
    format: 'dd-mm-yyyy',
    autohide: true,
    language: 'es',
    minDate:this.minDate,
  });

  datepicker.setDate(this.minDate);
  
}

  startTimer(){
    const now = new Date();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    // Calcular los milisegundos hasta el próximo múltiplo de 10 minutos
    const delay = ((10 - (minutes % 10)) * 60 - seconds) * 1000;
    // Esperar hasta el próximo múltiplo de 10 y luego iniciar el intervalo de 10 minutos
    this.timerSubscription = timer(delay, 10 * 60 * 1000).subscribe(() => {
      this.loadData();
      this.dialog.closeAll();
    });
  }

  loadData(){  
    const mes = (this.fecha.getMonth() +1).toString();
    const day = (this.fecha.getDate()).toString();
    const anio = (this.fecha.getFullYear()).toString();
    this.minDate = `${day}-${mes}-${anio}`; 
    this.fechaSeleccionada = this.minDate; 
    const queryParams={
      user:1,
      fecha: this.fecha
    }
    this.turnosService.getEventos(queryParams).subscribe(
      (data:any)=>{        
        this.turnos = data.turnos;
        this.idEvento = data.idEvento;
        this.pageIndex = 0;
        this.paginatedItems = this.turnos.slice(this.pageIndex * this.pageSize,1 * this.pageSize);
      },
      error =>{
        this.snackBarService.show(error.error.message,'error');
      }
    )
  }

  changeFecha(event:any){
    const div:HTMLInputElement = document.getElementById('datepicker-format') as HTMLInputElement;    
    const [dia, mes, anio] = div.value.split('-').map((value: string) => parseInt(value, 10));
    const fecha = new Date(anio,(mes-1),dia);

    this.fecha.setFullYear(fecha.getFullYear(),fecha.getMonth(),fecha.getDate());

    this.loadData();
  }

  onPageChange(event:any){    
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.paginatedItems = this.turnos.slice(this.pageIndex * this.pageSize,(this.pageIndex + 1) * this.pageSize);
  }

  open(item:any){
    const dialogRef = this.dialog.open(RegistrarAsistenteComponent,{
      width:'100%',      
      height: 'auto',
      disableClose:true,
      data:{
        fecha:this.fechaSeleccionada + ' '  + item.turno,
        idEvento:this.idEvento,
        turnos:this.turnos
      }
    });

    dialogRef.afterClosed().subscribe(
      data=>{
        const queryParams = {
          idCliente:this.variableService.idCliente,
          fecha:data.fecha
        }
        this.turnosService.sendNotification(queryParams).subscribe(
          {
            next: (data:any) => {
              if (data[0]){
                const registro = data[0]
                const fecha = new Date(registro.FECHAASISTENCIA);
                const mes = (fecha.getMonth() +1).toString();
                const day = (fecha.getDate()).toString();
                const anio = (fecha.getFullYear()).toString();
                const list = [
                  `Documento: ${registro.DOCUMENTO}`,
                  `Fecha del turno: ${anio}-${mes}-${day}`,
                  `Hora: ${registro.HORAASISTENCIA}`,
                  `Numero niños registrados: ${registro.TOTAL}`
                ]
                const dialogAlert = this.dialog.open(AlertsComponent,{                  
                  data:{
                    message:'Gracias por registrar tu turno en nuestra estación.',
                    list:list
                  }
                });

                dialogAlert.afterClosed().subscribe(
                  {
                    next:(data)=>{
                      this.loadData();
                    },
                    error:error=>{
                      this.snackBarService.show(error.error.message,'error');
                    }
                  }
                )
              }  
              else{
                this.loadData();
              }            
            },
            error: error => {
              this.snackBarService.show(error.error.message,'error');
            }
          }
        )                      
      }
    )
  }
}
