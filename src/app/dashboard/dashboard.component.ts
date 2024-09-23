import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { VariablesService } from '../services/variables.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  isMobileMenuOpen = false;
  isUserMenuOpen = false;

  constructor(private router:Router,
              private variables:VariablesService
  ){

  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  toggleUserMenu(){
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const clickedInside = target.closest('#mobile-menu, #mobile-menu-button') !== null;
    if (!clickedInside) {
      this.isMobileMenuOpen = false;
    }

    const clickedUserBotton = target.closest('#user-menu-button') !== null;

    if (!clickedUserBotton){
      this.isUserMenuOpen = false;
    }
  }

  get nombre(){  
    return localStorage.getItem('gran-type') === 'client' ? this.variables.nombreCliente : this.variables.usuario
  }

  get typeUser(){
    return localStorage.getItem('gran-type')
  }

  logout(){
    this.variables.logout(this.typeUser!);
  }  
}
