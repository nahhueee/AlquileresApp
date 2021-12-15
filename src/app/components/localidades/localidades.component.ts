import { Component, OnInit } from '@angular/core';
import { ZonasService } from 'src/app/services/zonas.service';

@Component({
  selector: 'app-localidades',
  templateUrl: './localidades.component.html',
  styleUrls: ['./localidades.component.css']
})
export class LocalidadesComponent implements OnInit {
  Zonas:any=[]

  constructor(private zonaService:ZonasService) { }

  ngOnInit(): void {
    this.obtenerZonas()
  }

  obtenerZonas(){
    this.zonaService.obtenerZonas().subscribe(
    res => {this.Zonas = res},
    err => console.log(err)
  )}

}
