import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
import { RegistroService } from 'src/app/services/registro.service';

@Component({
  selector: 'app-dato-contacto',
  templateUrl: './dato-contacto.component.html',
  styleUrls: ['./dato-contacto.component.css']
})
export class DatoContactoComponent implements OnInit {
  Contacto:any=[]
  msgs!: Message[];
  Indice:number 
  public form: FormGroup;
  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(private titlepage:Title,private router:Router,private registroService:RegistroService) { 
    this.Indice = 2

    this.titlepage.setTitle('Contacto')

    this.form= this.createForm();
  }

  ngOnInit(): void {
    this.LLenarForm()
  }

  LLenarForm(){
    this.Contacto[0] = JSON.parse(localStorage.getItem('contacto') ?? '') 
    this.form.controls['telefono1'].setValue(this.Contacto[0].telefono1);
    this.form.controls['telefono2'].setValue(this.Contacto[0].telefono2);
    this.form.controls['wpp'].setValue(this.Contacto[0].wpp);
    this.form.controls['web'].setValue(this.Contacto[0].web);
    this.form.controls['mail'].setValue(this.Contacto[0].mail);
  }

  createForm() {
    return new FormGroup({
      telefono1: new FormControl('',[Validators.pattern(/^-?(0|[1-9]\d*)?$/),Validators.required]),
      telefono2: new FormControl('',Validators.pattern(/^-?(0|[1-9]\d*)?$/)),
      wpp: new FormControl('1'),
      web: new FormControl(''),
      mail: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
    });
  }
  get telefono1Field(){return this.form.get('telefono1')}
  get telefono2Field(){return this.form.get('telefono2')}
  get mailField(){return this.form.get('mail')}

  nextPage(event: Event) {
    event.preventDefault();
    const value = this.form.value;
    
    if (this.form.valid) {
      const value = this.form.value;
      this.msgs=[]

      this.registroService.GuardarContacto(value)

      this.router.navigate(['registro/condiciones']);
    }else{
      this.form.markAllAsTouched();
      this.showAdvertencia()
    }
  }

  prevPage() {
    this.router.navigate(['registro/servicios']);
  }

  showAdvertencia(){this.msgs = [{severity:'info', summary:'Info', detail:'Parece que te falta completar algo importante, revisa nuevamente los datos.'}];
  }
  showError(){this.msgs = [{severity:'error', summary:'Error', detail:'Ocurrio un error al mandar el email, intenta nuevamente'}];
  }
}
