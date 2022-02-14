import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  baseUrl = environment.baseUrl;
  constructor(private http:HttpClient) { }

  GuardarDatosGenerales(objeto:any[]){
    localStorage.setItem('generales', JSON.stringify(objeto))
  }
  GuardarServicios(objeto:any[]){
    localStorage.setItem('servicios', JSON.stringify(objeto))
  }
  GuardarContacto(objeto:any[]){
    localStorage.setItem('contacto', JSON.stringify(objeto))
  }
  GuardarCondiciones(objeto:any[], pagos:any[]){
    localStorage.setItem('condiciones', JSON.stringify(objeto))
    localStorage.setItem('pagos', JSON.stringify(pagos))
  }

  EnviarDatosNuevo(Datos:any=[]){
    let url = this.baseUrl + 'send-email/new';
    console.log(Datos)
    return this.http.post(url,Datos,{withCredentials:false})
  }
}
