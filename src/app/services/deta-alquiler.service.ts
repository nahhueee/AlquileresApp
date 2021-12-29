import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DetaAlquilerService {
  baseUrl = environment.baseUrl;
  constructor(private http:HttpClient) { }

  obtenerDetalleAlquileres(IdAlquiler:number){
    let url = this.baseUrl + `rentals/${IdAlquiler}`;
    return this.http.get(url,{withCredentials:false})
  }
  obtenerServiciosAlquileres(IdAlquiler:number){
    let url = this.baseUrl + `rentals/services/${IdAlquiler}`;
    return this.http.get(url,{withCredentials:false})
  }
  obtenerGaleriaAlquileres(IdAlquiler:number){
    let url = this.baseUrl + `rentals/galery/${IdAlquiler}`;
    return this.http.get(url,{withCredentials:false})
  }
  obtenerTarifasAlquileres(IdAlquiler:number){
    let url = this.baseUrl + `rentals/rate/${IdAlquiler}`;
    return this.http.get(url,{withCredentials:false})
  }
  obtenerReseñasAlquileres(IdAlquiler:number){
    let url = this.baseUrl + `rentals/coments/${IdAlquiler}`;
    return this.http.get(url,{withCredentials:false})
  }
  obtenerCondicionesAlquileres(IdAlquiler:number){
    let url = this.baseUrl + `rentals/condition/${IdAlquiler}`;
    return this.http.get(url,{withCredentials:false})
  }
  obtenerRelacionados(idZona:number, idCategoria:number, idAlquiler:number){
    let url = this.baseUrl + `rentals/related/`;
    return this.http.put(url,{idZona:idZona, idCategoria:idCategoria, idAlquiler:idAlquiler},{withCredentials:false})
  }


  PublicarComentario(Coment:any[]){
    let url = this.baseUrl + `rentals/postcoment/`;
    return this.http.post(url,Coment,{withCredentials:false})
  }
  consultarTotalRaiting(IdAlquiler:number){
    let url = this.baseUrl + `rentals/gralraiting/${IdAlquiler}`;
    return this.http.get(url,{withCredentials:false})
  }
  consultarEmailComentario(idAlquiler:number, mail:string){
    let url = this.baseUrl + `rentals/verify/`;
    return this.http.put(url,{idAlquiler:idAlquiler,mail:mail},{withCredentials:false})
  }


  EnviarEmail(Mail:any[]){
    let url = this.baseUrl + `send-email/`;
    return this.http.post(url,Mail,{withCredentials:false})
  }
  
}
