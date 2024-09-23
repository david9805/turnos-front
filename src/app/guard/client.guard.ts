import { Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class clientGuard implements CanActivate {
  constructor (private router:Router){

  }
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    const rol = localStorage.getItem('gran-type');
    if (rol === 'client'){
      return true
    }
    else{
      this.router.navigate(['/user']);
      return false
    }    
  }
};
