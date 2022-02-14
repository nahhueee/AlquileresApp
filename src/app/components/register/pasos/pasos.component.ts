import { Component, OnInit, Input, HostListener } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-pasos',
  templateUrl: './pasos.component.html',
  styleUrls: ['./pasos.component.css']
})
export class PasosComponent implements OnInit {
  @Input() IndiceActivo:number = 0;
  items: MenuItem[] =[];
  public innerWidth: any;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
  this.innerWidth = window.innerWidth;
  }
  
  constructor() { }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    this.items = [
      {label: 'Datos\nGenerales',},
      {label: 'Servicios',},
      {label: 'Contacto',},
      {label: 'Condiciones',},
      {label: 'Confirmación',}
    ];
  }
  
}
