import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ComidaService {
  baseUrl = environment.baseUrl;
  constructor(private http:HttpClient) { }

  obtenerDelivery(){
    let url = this.baseUrl + `food/delivery`;
    return this.http.get(url,{withCredentials:false})
  }
}
