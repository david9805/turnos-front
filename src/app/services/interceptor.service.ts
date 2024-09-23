import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Observable } from 'rxjs';
import {finalize } from 'rxjs/operators';
import { SpinnerService } from './spinner.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private spinnerService:SpinnerService,
              private router:Router
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinnerService.llamarSpinner();

    return next.handle(req).pipe(
      finalize(()=>{
        this.spinnerService.detenerSpinner();
      })
    )
  }
}
