import { Injectable } from '@angular/core';
import { CanActivateFn, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class userGuard implements CanActivate{
  constructor (private router:Router){

  }
  canActivate(): Observable<boolean> | Promise<boolean> | boolean{
    const rol = localStorage.getItem('gran-type');
    if (rol === 'user'){
      return true
    }
    else{
      this.router.navigate(['/']);
      return false
    }    
  }
};
