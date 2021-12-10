import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DetaAlquilerService } from 'src/app/services/deta-alquiler.service';
import {latLng, MapOptions, tileLayer, Map, Marker, icon} from 'leaflet';
import { Mail } from 'src/app/models/mail';
import {Message} from 'primeng/api';

import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  IdAlquiler:number = 0;
  public innerWidth: any;
  msgs!: Message[];

  DetaAlquiler: any = [];

  ServiciosDestacados: any = [];
  ServiciosAlquiler: any = [];

  GaleriaAlquiler: any = [];

  ComentariosAlquiler:any = [];
  UltimosComentarios:any = [];
  total5:number=0;
  total4:number=0;
  total3:number=0;
  total2:number=0;
  total1:number=0;

  map!: Map;
  mapOptions: MapOptions;

  
  public formContact: FormGroup;
  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(private rutaActiva:ActivatedRoute, private detaService:DetaAlquilerService) {
    this.mapOptions = {},
    this.formContact= this.createForm();
  }

  imagesSlider = {
    speed:500,
    slidesToShow:1,
    slidesToScroll:1,
    cssEase:'linear',
    fade:true,
    autoplay: true,
    draggable:true,
    prevArrow:'.client-feedback .prev-arrow',
    nextArrow:'.client-feedback .next-arrow',
    asNavFor:".thumbs",
  };
  thumbnailsSlider = {
    arrows:true,
    speed:500,
    slidesToShow:5,
    slidesToScroll:1,
    cssEase:'linear',
    autoplay: true,
    centerMode:true,
    draggable:false,
    focusOnSelect:true,
    asNavFor:".feedback",
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          autoplay: true,
          
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          autoplay: true,
        }
      }
    ]
   };

  ngOnInit(): void {
    this.rutaActiva.params.subscribe(
      (params: Params) => {
        this.IdAlquiler = params.id;
      }
    );
    this.innerWidth = window.innerWidth;

    this.obtenerDetalleAlquiler()
    this.obtenerServiciosAlquiler()
    this.obtenerGaleriaAlquiler()
    this.initializeMapOptions()
    this.obtenerReseñasAlquiler()
  }

  // FormContacto
  createForm() {
    return new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
      name: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      message: new FormControl(''),
      state: new FormControl('',[Validators.required]),
      entrada: new FormControl(''),
      salida: new FormControl(''),
      mayor: new FormControl('',Validators.pattern(/^-?(0|[1-9]\d*)?$/)),
      menor: new FormControl('',Validators.pattern(/^-?(0|[1-9]\d*)?$/)),
    });
  }
  get emailField(){return this.formContact.get('email')}
  get nameField(){return this.formContact.get('name')}
  get phoneField(){return this.formContact.get('phone')}
  get messageField(){return this.formContact.get('message')}
  get entradaField(){return this.formContact.get('entrada')}
  get salidaField(){return this.formContact.get('salida')}
  get mayorField(){return this.formContact.get('mayor')}
  get menorField(){return this.formContact.get('menor')}
  get stateField(){return this.formContact.get('state')}

  // Mapa
  onMapReady(map: Map) {
    this.map = map;
    this.addSampleMarker();
  }

  private initializeMapOptions() {
    this.mapOptions = {
      center: latLng(-31.73857178234314, -65.00440872624107),
      zoom: 17,
      layers: [
        tileLayer(
          'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          {
            maxZoom: 18,
            attribution: 'Map data © OpenStreetMap contributors'
          })
      ],
    };
  }

  private addSampleMarker() {
    const marker = new Marker([-31.73857178234314, -65.00440872624107])
      .setIcon(
        icon({
          iconSize: [38, 35],
          iconAnchor: [13, 41],
          iconUrl: 'assets/marker-icon.png'
        }));
    marker.addTo(this.map);
  }
// --------------------------------------------------
  @HostListener('window:resize', ['$event'])
  onResize(event) {
  this.innerWidth = window.innerWidth;
  }
  
  scrollToGalery() {
    document.getElementById("toGaleria")?.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }
  scrollToContact() {
    document.getElementById("toContact")?.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }
  scrollToRaiting() {
    document.getElementById("toRaiting")?.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }


  obtenerDetalleAlquiler(){
    this.detaService.obtenerDetalleAlquileres(this.IdAlquiler).subscribe(
    res => {this.DetaAlquiler = res, console.log(this.DetaAlquiler)},
    err => console.log(err)
  )}

  obtenerServiciosAlquiler(){
    this.detaService.obtenerServiciosAlquileres(this.IdAlquiler).subscribe(
    res => {this.ServiciosAlquiler = res
            this.ServiciosDestacados = this.ServiciosAlquiler.slice(0,6);
           },
    err => console.log(err)
  )}

  obtenerGaleriaAlquiler(){
    this.detaService.obtenerGaleriaAlquileres(this.IdAlquiler).subscribe(
    res => {this.GaleriaAlquiler = res},
    err => console.log(err)
  )}

  obtenerReseñasAlquiler(){
    this.detaService.obtenerReseñasAlquileres(this.IdAlquiler).subscribe(
    res => {
      this.ComentariosAlquiler = res,
      this.ConsultarEstrellas(),
      this.UltimosComentarios = this.ComentariosAlquiler.slice(0,3);
    },
    err => console.log(err)
  )}

  ConsultarEstrellas(){
    for(let x in this.ComentariosAlquiler){
      let numero = this.ComentariosAlquiler[x].raiting;
      if(numero==5){this.total5+=1}
      if(numero==4){this.total4+=1}
      if(numero==3){this.total3+=1}
      if(numero==2){this.total2+=1}
      if(numero==1){this.total1+=1}
     }
  }

  enviarMail(event: Event){

    event.preventDefault();
    const value = this.formContact.value;
    if (this.formContact.valid) {
      const value = this.formContact.value;

      this.msgs=[]

      if(value.mayor==''){value.mayor='0'}
      if(value.menor==''){value.menor='0'}

      value.total = parseInt(value.mayor, 10) + parseInt(value.menor, 10);


      value.alojamiento = this.DetaAlquiler[0].nombre
      value.hospedante = this.DetaAlquiler[0].mail.replace('\r\n','')

     
     this.detaService.EnviarEmail(value).subscribe(
        res => {if(res=='Recibido'){
                  this.showSuccesful()
                  this.formContact.reset()
                  
                }else{
                  this.showError()
                }},
        err => console.log(err)
      )
    } else {
      this.formContact.markAllAsTouched();
    };
    
  }

  showSuccesful(){this.msgs = [{severity:'success', summary:'Todo OK', detail:'Email enviado correctamente'}];
  }
  showError(){this.msgs = [{severity:'error', summary:'Error', detail:'Ocurrio un error al mandar el email, intenta nuevamente'}];
  }
   
}

