import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DetaAlquilerService } from 'src/app/services/deta-alquiler.service';
import {latLng, MapOptions, tileLayer, Map, Marker, icon} from 'leaflet';
import {Message} from 'primeng/api';

import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  click:boolean=true
  isReadMore = true
  isLeerMas = true
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
  SelectNum: number = 0;
  alerta!: Message[];

  map!: Map;
  latitud:number=0
  longitud:number=0
  mapOptions: MapOptions;

  
  public formContact: FormGroup;
  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  public formComentarios: FormGroup;

  CondicionesAlquiler:any=[];
  Relacionados:any=[];

  constructor(private titlepage:Title,private rutaActiva:ActivatedRoute, private detaService:DetaAlquilerService, private router:Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.mapOptions = {},
    this.formContact= this.createForm();
    this.formComentarios= this.createFormComentarios();
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


   slideConfig = {
    dots: false,
    arrows: false,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    
  };

  ngOnInit(): void {
    this.rutaActiva.params.subscribe(
      (params: Params) => {
        this.IdAlquiler = params.id;
        this.titlepage.setTitle(params.nombre)  
      }
    );
    this.innerWidth = window.innerWidth;

    this.obtenerDetalleAlquiler()
    this.obtenerServiciosAlquiler()
    this.obtenerGaleriaAlquiler()
    this.obtenerReseñasAlquiler()
    this.obtenerCondicionesAlquiler()
    // this.obtenerRelacionados()

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

  createFormComentarios() {
    return new FormGroup({
      mail: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
      titulo: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      descripcion: new FormControl('', [Validators.required, Validators.minLength(30),Validators.maxLength(250)]),
    });
  }
  get mail(){return this.formComentarios.get('mail')}
  get titulo(){return this.formComentarios.get('titulo')}
  get descripcion(){return this.formComentarios.get('descripcion')}


  
  // Mapa
  onMapReady(map: Map) {
    this.map = map;
    map.dragging.disable();
    map.touchZoom.disable();
    map.doubleClickZoom.disable();
    map.scrollWheelZoom.disable();
    map.boxZoom.disable();
    map.keyboard.disable();
    map.dragging.disable ()
    if (map.tap) map.tap.disable();
   
    this.addSampleMarker();
  }
  ActivarMapa(){
    this.map.dragging.enable();
    this.map.touchZoom.enable();
    this.map.doubleClickZoom.enable();
    this.map.scrollWheelZoom.enable();
    this.map.boxZoom.enable();
    this.map.keyboard.enable();
    this.map.dragging.enable ()
    if (this.map.tap) this.map.tap.enable();
  }

  private initializeMapOptions() {
    this.mapOptions = {
      center: latLng(this.latitud, this.longitud),
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
    const marker = new Marker([this.latitud, this.longitud])
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



  showText() {
     this.isReadMore = !this.isReadMore
  }
  showConditios() {
    this.isLeerMas = !this.isLeerMas
 }

  obtenerDetalleAlquiler(){
    this.detaService.obtenerDetalleAlquileres(this.IdAlquiler).subscribe(
    res => {this.DetaAlquiler = res,
       this.latitud = this.DetaAlquiler[0].latitud, this.longitud = this.DetaAlquiler[0].longitud,
       this.initializeMapOptions() 
       this.obtenerRelacionados()},
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

  obtenerCondicionesAlquiler(){
    this.detaService.obtenerCondicionesAlquileres(this.IdAlquiler).subscribe(
    res => {
      this.CondicionesAlquiler = res
    },
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

  obtenerRelacionados(){
    this.detaService.obtenerRelacionados(this.DetaAlquiler[0].idZona,this.DetaAlquiler[0].idCategoria, this.IdAlquiler).subscribe(
    res => {
      this.Relacionados = res
    },
    err => console.log(err)
  )
}

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

 ConsultarTotalRaiting(){
    this.detaService.consultarTotalRaiting(this.IdAlquiler).subscribe(
    res => {
      this.DetaAlquiler[0].cantValoraciones = res[0].cantValoraciones,
      this.DetaAlquiler[0].Raiting = res[0].Raiting
    },
    err => console.log(err)
  )}


  PublicarComentario(event: Event){
    event.preventDefault();
    const value = this.formComentarios.value;
    if (this.formComentarios.valid && this.SelectNum!=0){
      const value = this.formComentarios.value;
      value.numero = this.SelectNum
      value.idAlquiler = this.IdAlquiler

      this.alerta=[]
            
            this.detaService.consultarEmailComentario(value.idAlquiler,value.mail).subscribe(
             res => {
               if(res=='Ok'){
                
                this.detaService.PublicarComentario(value).subscribe(
                  res => {if(res=='Realizado'){
                            this.showComentSuccesful()
                            this.formComentarios.reset()
                            this.SelectNum = 0

                            this.obtenerReseñasAlquiler()
                            this.ConsultarTotalRaiting()
                          }else{
                            this.showComentError()
                          }},

                  err => { console.log(err),
                          this.showComentError()}
                  )
            }else{
              this.showComentInfo()
            }},
            err => { console.log(err),
            this.showComentError()}
          )

        }
    else {this.formComentarios.markAllAsTouched();}
    }

  enviarMail(event: Event){

    event.preventDefault();
    const value = this.formContact.value;
    if (this.formContact.valid) {
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
  showComentSuccesful(){this.alerta = [{severity:'success', summary:'Todo OK', detail:'Tu reseña se agregó correctamente.'}]};
  showComentError(){this.alerta = [{severity:'error', summary:'Error', detail:'Ocurrio un error al publicar tu reseña, intenta nuevamente'}]};
  showComentInfo(){ this.alerta = [{severity:'info', summary:'Ups', detail:'Parece que ya has hecho una valoración de este alojamiento'}]};
 

  showSuccesful(){this.msgs = [{severity:'success', summary:'Todo OK', detail:'Email enviado correctamente'}];
  }
  showError(){this.msgs = [{severity:'error', summary:'Error', detail:'Ocurrio un error al mandar el email, intenta nuevamente'}];
  }
   
}

