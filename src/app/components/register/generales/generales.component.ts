import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
import { RegistroService } from 'src/app/services/registro.service';

@Component({
  selector: 'app-generales',
  templateUrl: './generales.component.html',
  styleUrls: ['./generales.component.css']
})
export class GeneralesComponent implements OnInit {
  msgs!: Message[];
  Indice:number 
  public form: FormGroup;
  Generales:any=[]

  constructor(private titlepage:Title,private router:Router, private registroService:RegistroService) {
    this.Indice = 0

    this.titlepage.setTitle('Datos Generales')

    this.form= this.createForm();
   }

  ngOnInit(): void {
    this.LLenarForm()

  }
  
  LLenarForm(){
    this.Generales[0] = JSON.parse(localStorage.getItem('generales') ?? '') 
    this.form.controls['name'].setValue(this.Generales[0].name);
    this.form.controls['localidad'].setValue(this.Generales[0].localidad);
    this.form.controls['categoria'].setValue(this.Generales[0].categoria);
    this.form.controls['capacidad'].setValue(this.Generales[0].capacidad);
    this.form.controls['habitaciones'].setValue(this.Generales[0].habitaciones);
    this.form.controls['precio'].setValue(this.Generales[0].precio);
    this.form.controls['condicion'].setValue(this.Generales[0].condicion);
    this.form.controls['direccion'].setValue(this.Generales[0].direccion);
    this.form.controls['descripcion'].setValue(this.Generales[0].descripcion);
  }

  createForm() {
    return new FormGroup({
      name: new FormControl('', [Validators.required]),
      localidad: new FormControl('', [Validators.required]),
      categoria: new FormControl('',[Validators.required]),
      capacidad: new FormControl('',Validators.pattern(/^-?(0|[1-9]\d*)?$/)),
      habitaciones: new FormControl('',Validators.pattern(/^-?(0|[1-9]\d*)?$/)),
      precio: new FormControl('',Validators.pattern(/^-?(0|[1-9]\d*)?/)),
      condicion: new FormControl('xPersona'),
      direccion: new FormControl('',[Validators.required]),
      descripcion: new FormControl('', [Validators.maxLength(500)]),
      
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

  nextPage(event: Event) {
    event.preventDefault();
    const value = this.form.value;
    
    if (this.form.valid) {
      const value = this.form.value;
      this.msgs=[]

      this.registroService.GuardarDatosGenerales(value)

      this.router.navigate(['registro/servicios']);
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
