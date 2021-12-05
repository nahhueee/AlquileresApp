import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DetaAlquilerService } from 'src/app/services/deta-alquiler.service';
import {latLng, MapOptions, tileLayer, Map, Marker, icon} from 'leaflet';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  IdAlquiler:number = 0;
  public innerWidth: any;


  DetaAlquiler: any = [];

  ServiciosDestacados: any = [];
  ServiciosAlquiler: any = [];

  GaleriaAlquiler: any = [];

  map!: Map;
  mapOptions: MapOptions;

  constructor(private rutaActiva:ActivatedRoute, private detaService:DetaAlquilerService) {
    this.mapOptions = {}
  }
  
  // showGallery(index: number) {
  //   let prop = {
  //       images: [] as any,
  //       index,
  //       width:100,
  //       height:100
  //   };
    
  //   this.GaleriaAlquiler.forEach(function(image) {
  //     prop.images.push(image)
  //   })
  //   this.gallery.load(prop);
  // }

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
  }


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
    res => {this.DetaAlquiler = res},
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
}

