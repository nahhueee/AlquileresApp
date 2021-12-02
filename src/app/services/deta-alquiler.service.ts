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
}
