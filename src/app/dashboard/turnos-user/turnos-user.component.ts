import { Component, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { TurnosService } from 'src/app/services/turnos.service';
import { ListAsistentesComponent } from './list-asistentes/list-asistentes.component';
import { interval, Subscription, timer } from 'rxjs';
import { Datepicker } from 'flowbite';

@Component({
  selector: 'app-turnos-user',
  templateUrl: './turnos-user.component.html',
  styleUrls: ['./turnos-user.component.css']
})
export class TurnosUserComponent {

  
  pageIndex:number=0;
  pageSize:number=16;
  paginatedItems:any=[];
  turnos:any = [];
  fecha:Date = new Date();
  idEvento:number=0;

  timerSubscription: Subscription | null = null;

  private _fechaSeleccionada = '';
  get fechaSeleccionada() {
    return this._fechaSeleccionada;
  }
  set fechaSeleccionada(value) {
    this._fechaSeleccionada = value;
  }

  constructor(private turnosService:TurnosService,
              private snackBarService:SnackbarService,
              private dialog:MatDialog,
              private el: ElementRef
  ){
  }

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
    });
    datepicker.setDate(this.fechaSeleccionada);
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
  
  onPageChange(event:any){    
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.paginatedItems = this.turnos.slice(this.pageIndex * this.pageSize,(this.pageIndex + 1) * this.pageSize);
  }

  changeFecha(event:any){
    const div:HTMLInputElement = document.getElementById('datepicker-format') as HTMLInputElement;    
    const [dia, mes, anio] = div.value.split('-').map((value: string) => parseInt(value, 10));
    const fecha = new Date(anio,(mes-1),dia);

    this.fecha.setFullYear(fecha.getFullYear(),fecha.getMonth(),fecha.getDate());

    this.loadData();
  }

  loadData(){    
    const mes = (this.fecha.getMonth() +1).toString();
    const day = (this.fecha.getDate()).toString();
    const anio = (this.fecha.getFullYear()).toString();
    this.fechaSeleccionada = `${day}-${mes}-${anio}`; 
    const minutes = this.fecha.getMinutes() ;
    this.fecha.setMinutes(minutes -9);
    
    const queryParams={
      user:0,
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

  open(item:any){
    const dialogRef = this.dialog.open(ListAsistentesComponent,
      {
        data:{
          fecha:this.fechaSeleccionada + ' '  + item.turno,
          idEvento:this.idEvento,
        },
        width:'100%'
      }
    );
  }

}
