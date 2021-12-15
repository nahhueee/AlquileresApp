import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ZonasService {

  constructor(private http:HttpClient) { }

  obtenerZonas(){
    return this.http.get(`api/zones`,{withCredentials:true})
  }

  obtenerDetalleZona(idZona:number){
    return this.http.get(`api/zones/det/${idZona}`,{withCredentials:true})
  }

  obtenerAlojamientos(idZona:number){
    return this.http.get(`api/zones/rentals/${idZona}`,{withCredentials:true})
  }
}
