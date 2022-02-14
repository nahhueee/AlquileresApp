import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
import { RegistroService } from 'src/app/services/registro.service';

@Component({
  selector: 'app-condiciones',
  templateUrl: './condiciones.component.html',
  styleUrls: ['./condiciones.component.css']
})
export class CondicionesComponent implements OnInit {
  Condiciones:any=[]
  msgs!: Message[];
  Indice:number 
  public form: FormGroup;
  
  TiposPagos = [
    {name: "Efectivo", isSelected: false},
    {name: "Tarjetas", isSelected: false},
    {name: "Transferencias", isSelected: false}
  ]

  constructor(private titlepage:Title,private router:Router,private registroService:RegistroService) {
    this.Indice = 3

    this.titlepage.setTitle('Condiciones')

    this.form= this.createForm();
  
   }

  ngOnInit(): void {
    this.LlenarForm()
  }

  LlenarForm(){
    this.TiposPagos =JSON.parse(localStorage.getItem('pagos') ?? '')

    this.Condiciones[0] = JSON.parse(localStorage.getItem('condiciones') ?? '') 
    this.form.controls['entrada'].setValue(this.Condiciones[0].entrada);
    this.form.controls['salida'].setValue(this.Condiciones[0].salida);
    this.form.controls['visitas'].setValue(this.Condiciones[0].visitas);
    this.form.controls['reservas'].setValue(this.Condiciones[0].reservas);
}

  createForm() {
    return new FormGroup({
      entrada: new FormControl(''),
      salida: new FormControl(''),
      visitas: new FormControl('2'),
      reservas: new FormControl(''),
    });
  }

  prevPage() {
    this.router.navigate(['registro/contacto']);
  }

  nextPage(event: Event) {
    event.preventDefault();
    const value = this.form.value;
    
    if (this.form.valid) {
      const value = this.form.value;
      this.msgs=[]

      this.registroService.GuardarCondiciones(value,this.TiposPagos)
      this.router.navigate(['registro/confirmacion']);
    }else{
      this.form.markAllAsTouched();
      this.showAdvertencia()
    }
  }


  showAdvertencia(){this.msgs = [{severity:'info', summary:'Info', detail:'Parece que te falta completar algo importante, revisa nuevamente los datos.'}];
  }
  showError(){this.msgs = [{severity:'error', summary:'Error', detail:'Ocurrio un error al mandar el email, intenta nuevamente'}];
  }
}
