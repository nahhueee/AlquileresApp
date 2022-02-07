import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlquileresService {
  baseUrl = environment.baseUrl;
  constructor(private http:HttpClient) { }

  obtenerTopAlquileres(){
    let url = this.baseUrl + 'rentals/';
    return this.http.get(url,{withCredentials:false})
  }

  obtenerAlquileres(Filtro:any=[]){
    console.log(Filtro)
    let url = this.baseUrl + 'rentals/';
    return this.http.put(url,Filtro,{withCredentials:false})
  }

  EnviarDatosNuevo(Datos:any=[]){
    let url = this.baseUrl + 'send-email/new';
    return this.http.post(url,Datos,{withCredentials:false})
  }

  obtenerAllAlquileres(){
    let url = this.baseUrl + 'rentals/all';
    return this.http.get(url,{withCredentials:false})
  }
  obtenerClicks(Datos:any){
    let url = this.baseUrl + 'rentals/clicks';
    return this.http.put(url,Datos,{withCredentials:false})
  }
}
