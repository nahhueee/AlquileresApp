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
    let url = this.baseUrl + 'api/rentals';
    return this.http.get(url,{withCredentials:false})
  }

  obtenerAlquileres(Filtro:any=[]){
    let url = this.baseUrl + 'api/rentals';
    return this.http.put(url,Filtro,{withCredentials:false})
  }

  EnviarDatosNuevo(Datos:any=[]){
    let url = this.baseUrl + 'api/send-email/new';
    return this.http.post(url,Datos,{withCredentials:false})
  }
}
