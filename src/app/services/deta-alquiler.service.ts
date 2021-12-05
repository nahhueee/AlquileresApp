import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
}
