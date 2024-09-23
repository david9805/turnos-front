import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-habeas-data',
  templateUrl: './habeas-data.component.html',
  styleUrls: ['./habeas-data.component.css']
})
export class HabeasDataComponent {

  constructor(private matDialogRef:MatDialogRef<HabeasDataComponent>){

  }
  onDecline(){
    this.matDialogRef.close({
      habeas:false
    });
  }

  onAccept(){
    this.matDialogRef.close({
      habeas:true
    });
  }
}
