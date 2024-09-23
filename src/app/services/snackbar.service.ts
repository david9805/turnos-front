import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomSnackbarComponent } from '../components/custom-snackbar/custom-snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar:MatSnackBar) { }


  show(message:string,style:string = 'success',action:boolean =false){
    this.snackBar.openFromComponent(CustomSnackbarComponent,{
      data:{
        style:style,
        message:message,
        action:false
      },
      duration:3000
    })
  }

  showAlert(message: string, style: string = 'success', action: boolean = true,) {
    this.snackBar.openFromComponent(CustomSnackbarComponent, {
      data: {
        style: style,
        message: message,
        action: true,
        preClose: () => {this.snackBar.dismiss()} 
      },
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ["snack-style", 'w-100']
    });
  }
}
