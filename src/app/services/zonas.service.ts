import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ZonasService {
  baseUrl = environment.baseUrl;
  constructor(private http:HttpClient) { }

  obtenerZonas(){
    let url = this.baseUrl + `zones/`;
    return this.http.get(url,{withCredentials:false})
  }

  obtenerDetalleZona(idZona:number){
    let url = this.baseUrl + `zones/det/${idZona}`;
    return this.http.get(url,{withCredentials:false})
  }

  obtenerAlojamientos(idZona:number){
    let url = this.baseUrl + `zones/rentals/${idZona}`;
    return this.http.get(url,{withCredentials:false})
  }
  obtenerGaleria(idZona:number){
    let url = this.baseUrl + `zones/galery/${idZona}`;
    return this.http.get(url,{withCredentials:false})
  }
}
