import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent {
  message:string = '';
  list:any =[];
  constructor(@Inject(MAT_DIALOG_DATA) data:any,
              private matDialogRef:MatDialogRef<AlertsComponent>)
  {
    this.message = data.message;
    this.list = data.list;
  }

  close(){
    this.matDialogRef.close();
  }
}
