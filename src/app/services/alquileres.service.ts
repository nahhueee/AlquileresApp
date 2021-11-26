import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AlquileresService {
  // API_URI = 'http://127.0.0.1:3000/api/rentals'
  constructor(private http:HttpClient) { }

  obtenerTopAlquileres(){
    return this.http.get(`api/rentals`,{withCredentials:true})
  }

  obtenerAlquileres(Filtro:any=[]){
    return this.http.put(`api/rentals`,Filtro,{withCredentials:true})
  }
}
