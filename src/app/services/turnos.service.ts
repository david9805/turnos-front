import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';


@Injectable({
  providedIn: 'root'
})
export class TurnosService {

  constructor(private http:HttpClient) { }

  getEventos(queryParams:any){
    const url = environment.base + environment.getEventos;
    return this.http.get(url,{params:queryParams})
  }

  getTurno(){
    const url = environment.base + environment.getTurno;
    return this.http.get(url);
  }

  getAsistentes(queryParams:any){
    const url = environment.base + environment.getAsistentes;
    return this.http.get(url,{params:queryParams});
  }

  getAsistentesByIdCliente(id:string,queryParams:any){
    const url = environment.base + environment.getAsistentesByIdCliente.replace('?',id);
    return this.http.get(url,{params:queryParams});
  }

  postAsistentes(body:any){
    const url = environment.base + environment.postAsistentes;

    return this.http.post(url,body);
  }

  putAsistentes(id:string,body:any){
    const url = environment.base + environment.putAsistentes.replace('?',id);
    return this.http.put(url,body);
  }

  getCliente(id:string){     
    const url = environment.base + environment.getCliente.replace('?',id);

    return this.http.get(url)
  }

  postCliente(body:any){
    const url = environment.base + environment.postCliente;

    return this.http.post(url,body);
  }

  getTipoDocumento(){
    const url = environment.base + environment.getTipoDocumento;

    return this.http.get(url);
  }

  deleteAsistente(idAsistente:number){
    const url = environment.base + environment.deleteAsistente.replace('?',idAsistente.toString());

    return this.http.delete(url);
  }

  loginUsuarios(body:any){
    const url = environment.base + environment.loginUsuarios;

    return this.http.post(url,body)
  }

  asist(id:number,body:any){
    const url = environment.base + environment.asist.replace('?',id.toString());

    return this.http.put(url,body);
  }

  putCliente(id:number,body:any){
    const url = environment.base + environment.putCliente.replace('?',id.toString());

    return this.http.put(url,body);
  }

  sendNotification(queryParams:any){
    const url = environment.base + environment.sendNotification;
    return this.http.get(url,{params:queryParams});
  }

}
