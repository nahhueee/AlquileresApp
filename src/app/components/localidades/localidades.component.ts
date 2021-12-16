import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ZonasService } from 'src/app/services/zonas.service';

@Component({
  selector: 'app-localidades',
  templateUrl: './localidades.component.html',
  styleUrls: ['./localidades.component.css']
})
export class LocalidadesComponent implements OnInit {
  Zonas:any=[]

  constructor(private titlepage:Title, private zonaService:ZonasService) { }

  ngOnInit(): void {
    this.titlepage.setTitle('Localidades')  
    this.obtenerZonas()
  }

  obtenerZonas(){
    this.zonaService.obtenerZonas().subscribe(
    res => {this.Zonas = res},
    err => console.log(err)
  )}

}
