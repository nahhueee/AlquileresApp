import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';
import { ZonasService } from 'src/app/services/zonas.service';

@Component({
  selector: 'app-det-zona',
  templateUrl: './det-zona.component.html',
  styleUrls: ['./det-zona.component.css']
})
export class DetZonaComponent implements OnInit {
  IdZona:number=0
  DetaZona:any=[]
  Alojamientos:any=[]
  Galeria:any=[]
  
  constructor(private titlepage:Title, private zonaService:ZonasService,private rutaActiva:ActivatedRoute) { }

  ngOnInit(): void {
    this.rutaActiva.params.subscribe(
      (params: Params) => {
        this.IdZona = params.id;
        this.titlepage.setTitle(params.nombre)  
      }
    );


    
    this.obtenerDetZona()
    this.obtenerAlojamientos()
    this.obtenerGaleria()
  }

  scrollToGalery() {
    document.getElementById("toGalery")?.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }
  scrollToAlojamientos() {
    document.getElementById("toAlojamientos")?.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }

  slideConfig = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 500,
    slidesToShow: 3, 
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 790,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
      
    ]};

  obtenerDetZona(){
    this.zonaService.obtenerDetalleZona(this.IdZona).subscribe(
    res => {this.DetaZona = res},
    err => console.log(err)
  )}

  obtenerAlojamientos(){
    this.zonaService.obtenerAlojamientos(this.IdZona).subscribe(
    res => {this.Alojamientos = res},
    err => console.log(err)
  )}

  obtenerGaleria(){
    this.zonaService.obtenerGaleria(this.IdZona).subscribe(
    res => {this.Galeria = res},
    err => console.log(err)
  )}
}
