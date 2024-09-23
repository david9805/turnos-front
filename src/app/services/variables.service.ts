import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class VariablesService {

  constructor(private router:Router) { 
    this.deserializeJson();
  }

  private _nombreCliente: string = '';
  public get nombreCliente(): string {
    return this._nombreCliente;
  }
  public set nombreCliente(value: string) {
    this._nombreCliente = value;
  }

  private _idCliente: number = 0;
  public get idCliente(): number {
    return this._idCliente;
  }
  public set idCliente(value: number) {
    this._idCliente = value;
  }


  private _idUsuario: number = 0;
  public get idUsuario(): number {
    return this._idUsuario;
  }
  public set idUsuario(value: number) {
    this._idUsuario = value;
  }

  private _usuario: string = '';
  public get usuario(): string {
    return this._usuario;
  }
  public set usuario(value: string) {
    this._usuario = value;
  }

  private _celular: number = 0;
  public get celular(): number {
    return this._celular;
  }
  public set celular(value: number) {
    this._celular = value;
  }

  private _email: string = '';
  public get email(): string {
    return this._email;
  }
  public set email(value: string) {
    this._email = value;
  }


  deserializeJson(){
    if (localStorage.getItem('data')){
      const data = JSON.parse(localStorage.getItem('data')!);
      if (data){                 
         this.nombreCliente = (data.nombre1 ? data.nombre1 : '') + ' ' + (data.apellido1 ? data.apellido1 : '');
         this.idCliente = data.idCliente ? data.idCliente : 0;
         this.idUsuario = data.idUsuario ? data.idUsuario : 0;
         this.usuario = data.nombreCompleto ? data.nombreCompleto : '',
         this.email = data.email ? data.email : '',
         this.celular = data.celular ? data.celular : ''
      }
    }
  }

  deleteLocalVaribles(){
    localStorage.removeItem('client');
    localStorage.removeItem('data');
    localStorage.removeItem('gran-type');
    localStorage.removeItem('registerClient');
  }
  logout(clientType:string){    
    this.deleteLocalVaribles();
    if (clientType === 'client'){
      this.router.navigate(['/']);
    }
    else{
      this.router.navigate(['/user']);
    }        
  }  

}
