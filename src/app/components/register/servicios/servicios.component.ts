import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RegistroService } from 'src/app/services/registro.service';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnInit {
  Indice:number 

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


  constructor(private titlepage:Title,private router:Router,private registroService:RegistroService) { 
    this.Indice = 1
    this.titlepage.setTitle('Servicios')
  }

  ngOnInit(): void {
    this.LlenarForm()
  }

  LlenarForm(){
    this.Servicios =JSON.parse(localStorage.getItem('servicios') ?? '')
  }

  prevPage() {
    this.router.navigate(['registro/general']);
  }
  nextPage() {
    this.registroService.GuardarServicios(this.Servicios)
    this.router.navigate(['registro/contacto']);
  }
}
