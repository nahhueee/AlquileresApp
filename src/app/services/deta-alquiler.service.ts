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

  EnviarEmail(Mail:any[]){
    return this.http.post(`api/send-email/`,Mail,{withCredentials:true})
  }
}
