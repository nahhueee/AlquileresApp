import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Mail } from '../models/mail';

@Injectable({
  providedIn: 'root'
})
export class DetaAlquilerService {

  constructor(private http:HttpClient) { }

  obtenerDetalleAlquileres(IdAlquiler:number){
    return this.http.get(`api/rentals/${IdAlquiler}`,{withCredentials:true})
  }
  obtenerServiciosAlquileres(IdAlquiler:number){
    return this.http.get(`api/rentals/services/${IdAlquiler}`,{withCredentials:true})
  }
  obtenerGaleriaAlquileres(IdAlquiler:number){
    return this.http.get(`api/rentals/galery/${IdAlquiler}`,{withCredentials:true})
  }
  obtenerTarifasAlquileres(IdAlquiler:number){
    return this.http.get(`api/rentals/rate/${IdAlquiler}`,{withCredentials:true})
  }
  obtenerReseñasAlquileres(IdAlquiler:number){
    return this.http.get(`api/rentals/coments/${IdAlquiler}`,{withCredentials:true})
  }
  obtenerCondicionesAlquileres(IdAlquiler:number){
    return this.http.get(`api/rentals/condition/${IdAlquiler}`,{withCredentials:true})
  }
  obtenerRelacionados(idZona:number, idCategoria:number, idAlquiler:number){
    return this.http.put(`api/rentals/related/`,{idZona:idZona, idCategoria:idCategoria, idAlquiler:idAlquiler},{withCredentials:true})
  }


  PublicarComentario(Coment:any[]){
    return this.http.post(`api/rentals/postcoment`,Coment,{withCredentials:true})
  }
  consultarTotalRaiting(IdAlquiler:number){
    return this.http.get(`api/rentals/gralraiting/${IdAlquiler}`,{withCredentials:true})
  }
  consultarEmailComentario(idAlquiler:number, mail:string){
    return this.http.put(`api/rentals/verify/`,{idAlquiler:idAlquiler,mail:mail},{withCredentials:true})
  }


  EnviarEmail(Mail:any[]){
    return this.http.post(`api/send-email/`,Mail,{withCredentials:true})
  }
  
}
