import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import * as moment from 'moment';

@Component({
  selector: 'app-custom-snackbar',
  templateUrl: './custom-snackbar.component.html',
  styleUrls: ['./custom-snackbar.component.css']
})
export class CustomSnackbarComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any,
  private snackBarRef: MatSnackBarRef<CustomSnackbarComponent>) { }
ngOnInit() {
let container = document.getElementsByClassName('cdk-overlay-pane');
let span = container[0].querySelector('mat-snack-bar-container.w-100');


if (span) {
container[0].classList.add('w-100');
} else {
container[0].classList.remove('w-100');
}

}

get statusClass() {
return this.data.style; // 'success', 'error', 'info', 'warning', etc.
}

get title() {
switch (this.statusClass) {
case 'success':
return 'Proceso Correcto';
case 'error':
return 'Proceso Erróneo';
case 'info':
return 'Alerta Informativa';
case 'warning':
return 'Alerta Advertencia';
default:
return 'Advertencia';
}
}

get message() {
return this.data.message;
}

get hour() {
return moment().format('LT');
}

get hasAction() {
return this.data.action;
}

dismiss() {    
this.snackBarRef.dismiss();    
}
}
