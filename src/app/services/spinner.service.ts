import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  constructor(private spinnerService:NgxSpinnerService) { }

  llamarSpinner(){
    this.spinnerService.show();
  }

  detenerSpinner(){
    this.spinnerService.hide();
  }
}
