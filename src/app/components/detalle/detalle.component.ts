import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DetaAlquilerService } from 'src/app/services/deta-alquiler.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  IdAlquiler:number = 0;

  DetaAlquiler: any = [];
  constructor(private rutaActiva:ActivatedRoute, private detaService:DetaAlquilerService) { }

  ngOnInit(): void {
    this.rutaActiva.params.subscribe(
      (params: Params) => {
        this.IdAlquiler = params.id;
      }
    );

    this.obtenerDetalleAlquiler()
  }

  obtenerDetalleAlquiler(){
    this.detaService.obtenerDetalleAlquileres(this.IdAlquiler).subscribe(
    res => {this.DetaAlquiler = res},
    err => console.log(err)
  )}
}
