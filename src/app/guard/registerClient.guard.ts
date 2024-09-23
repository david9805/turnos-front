import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { VariablesService } from '../services/variables.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn:'root'
})
export class registerClientGuard implements CanActivate{
  
  constructor (private router:Router){

  }
  canActivate(){
    const register = localStorage.getItem('registerClient');

    if (register === 'true'){
      return true
    }
    else{
      this.router.navigate(['/']);
      return false
    }    
  }
};
