import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';
import { RegistroService } from 'src/app/services/registro.service';

@Component({
  selector: 'app-confirmacion',
  templateUrl: './confirmacion.component.html',
  styleUrls: ['./confirmacion.component.css']
})
export class ConfirmacionComponent implements OnInit {
  Indice:number 
  msgs!: Message[];
  Datos:any=[]

  Generales:any=[]
  Servicios:any=[]
  Contacto:any=[]
  Condiciones:any=[]
  Pagos:any=[]

  constructor(private router:Router,private registroService:RegistroService) { 
    this.Indice = 4
  }

  ngOnInit(): void {
    this.Generales[0] = JSON.parse(localStorage.getItem('generales') ?? '') 
    this.Servicios[0] = JSON.parse(localStorage.getItem('servicios') ?? '') 
    this.Condiciones[0] = JSON.parse(localStorage.getItem('condiciones') ?? '') 
    this.Contacto[0] = JSON.parse(localStorage.getItem('contacto') ?? '') 
    this.Pagos[0] = JSON.parse(localStorage.getItem('pagos') ?? '')
  }

  prevPage() {
    this.router.navigate(['registro/condiciones']);
  }

  enviarMail(){
    this.msgs=[]
    this.Datos = JSON.parse(localStorage.getItem('generales') ?? '') 
    this.Datos.servicios = JSON.parse(localStorage.getItem('servicios') ?? '') 
    this.Datos.contacto = JSON.parse(localStorage.getItem('contacto') ?? '') 
    this.Datos.condiciones = JSON.parse(localStorage.getItem('condiciones') ?? '') 
    this.Datos.pagos = JSON.parse(localStorage.getItem('pagos') ?? '') 
    
    this.registroService.EnviarDatosNuevo(this.Datos).subscribe(
      res => { 
        if(res=='Recibido'){
              this.registroService.EliminarDatos()
              this.router.navigate(['/correcto'])
              }else{
                this.showError()
              }},
      err => {console.log(err),
        this.showError()
      }
    )
  }

  showError(){this.msgs = [{severity:'error', summary:'Error', detail:'Ocurrio un error al mandar el email, intenta nuevamente'}];
}
}
