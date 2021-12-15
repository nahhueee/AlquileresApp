import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';
import { AlquileresService } from 'src/app/services/alquileres.service';

@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styleUrls: ['./datos.component.css']
})
export class DatosComponent implements OnInit {
  msgs!: Message[];
  public form: FormGroup;
  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  

  Servicios = [
    {id : 1, name: "WI-FI", isSelected: false, descripcion: ""},
    {id : 2, name: "Cochera", isSelected: false, descripcion: ""},
    {id : 3, name: "Pileta", isSelected: false, descripcion: ""},
    {id : 4, name: "Aire Acondicionado", isSelected: false, descripcion: ""},
    {id : 5, name: "Calefaccion", isSelected: false, descripcion: ""},
    {id : 6, name: "Asador", isSelected: false, descripcion: ""},
    {id : 7, name: "Patio", isSelected: false, descripcion: ""},
    {id : 8, name: "Ventiladores", isSelected: false, descripcion: ""},
    {id : 9, name: "Vajilla", isSelected: false, descripcion: ""},
    {id : 10, name: "Se permite fumar", isSelected: false, descripcion: ""},
    {id : 11, name: "TV", isSelected: false, descripcion: ""},
    {id : 12, name: "Agua Caliente", isSelected: false, descripcion: ""},
    {id : 13, name: "Ropa de Cama", isSelected: false, descripcion: ""},
    {id : 14, name: "Se permite mascota", isSelected: false, descripcion: ""},
    {id : 15, name: "Desayuno", isSelected: false, descripcion: ""},
  ];

  constructor(private alquilerService:AlquileresService,private router:Router) {
    this.form= this.createForm();
   }

  ngOnInit(): void {   
  }



  createForm() {
    return new FormGroup({
      name: new FormControl('', [Validators.required]),
      localidad: new FormControl('', [Validators.required]),
      categoria: new FormControl('',[Validators.required]),
      capacidad: new FormControl('',Validators.pattern(/^-?(0|[1-9]\d*)?$/)),
      habitaciones: new FormControl('',Validators.pattern(/^-?(0|[1-9]\d*)?$/)),
      precio: new FormControl('',Validators.pattern(/^-?(0|[1-9]\d*)?$/)),
      condicion: new FormControl('xPersona'),
      direccion: new FormControl('',[Validators.required]),
      descripcion: new FormControl('', [Validators.maxLength(500)]),
      telefono1: new FormControl('',Validators.pattern(/^-?(0|[1-9]\d*)?$/)),
      telefono2: new FormControl('',Validators.pattern(/^-?(0|[1-9]\d*)?$/)),
      wpp: new FormControl(''),
      web: new FormControl(''),
      mail: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),

    });
  }


  get nameField(){return this.form.get('name')}
  get capacidadField(){return this.form.get('capacidad')}
  get categoriaField(){return this.form.get('categoria')}
  get localidadField(){return this.form.get('localidad')}
  get habitacionesField(){return this.form.get('habitaciones')}
  get direccionField(){return this.form.get('direccion')}
  get descripcionField(){return this.form.get('descripcion')}
  get precioField(){return this.form.get('precio')}
  get condicionField(){return this.form.get('condicion')}
  get telefono1Field(){return this.form.get('telefono1')}
  get telefono2Field(){return this.form.get('telefono2')}
  get mailField(){return this.form.get('mail')}

  enviar(event: Event){
    
    event.preventDefault();
    const value = this.form.value;
    
    if (this.form.valid) {
      const value = this.form.value;
      value.servicios = this.Servicios
      this.msgs=[]

      this.enviarMail(value)
    }else{
      this.form.markAllAsTouched();
    }
  }

  enviarMail(datos:any=[]){
    this.alquilerService.EnviarDatosNuevo(datos).subscribe(
      res => {if(res=='Recibido'){
             
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