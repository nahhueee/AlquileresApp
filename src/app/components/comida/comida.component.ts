import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ComidaService } from 'src/app/services/comida.service';

@Component({
  selector: 'app-comida',
  templateUrl: './comida.component.html',
  styleUrls: ['./comida.component.css']
})
export class ComidaComponent implements OnInit {
  Delivery:any=[]

  constructor(private titlepage:Title, private comidaService:ComidaService) { }

  ngOnInit(): void {
    this.titlepage.setTitle('¿Donde Comer?')  
    this.obtenerDelivery()
  }

  obtenerDelivery(){
    this.comidaService.obtenerDelivery().subscribe(
    res => {this.Delivery = res},
    err => console.log(err)
  )}
}
