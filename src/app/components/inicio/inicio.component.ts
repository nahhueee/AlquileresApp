import { Component, HostListener, OnInit } from '@angular/core';
import { AlquileresService } from 'src/app/services/alquileres.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  public innerWidth: any;
  raiting: number = 3.50;
  currentRating:number = 3.50;
  topAlquileres:any=[]
  slides = [
    {img: "http://placehold.it/350x150/000000"},
    {img: "http://placehold.it/350x150/111111"},
    {img: "http://placehold.it/350x150/333333"},
    {img: "http://placehold.it/350x150/666666"}
  ];
  publis = [
    {img: "assets/banners/BannerHomeWeb.jpg",
     link: "/contacto"}
  ];
  publismovil = [
    {img: "assets/banners/BannerHome.jpg",
    link: "/contacto"}
  ];
  constructor(private alquilerService:AlquileresService) { }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    this.obtenerTopAlquileres()
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
  this.innerWidth = window.innerWidth;
  }
  
  slideConfig = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 500,
    slidesToShow: 4, 
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
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

    slidebannerPubli = {
      dots: false,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 3000,
      speed: 1000,
      slidesToShow: 1, 
      slidesToScroll: 1,
      arrows: false,
      responsive: []};

  
    obtenerTopAlquileres(){
        this.alquilerService.obtenerTopAlquileres().subscribe(
        res => {this.topAlquileres = res},
        err => console.log(err)
    )}   
}


 
