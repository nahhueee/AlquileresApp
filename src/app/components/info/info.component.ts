import { Component, OnInit } from '@angular/core';
import { Combo } from 'src/app/models/combo';
import { AlquileresService } from 'src/app/services/alquileres.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  selectedAlojamiento: Combo | undefined;
  selectedMes: Combo | undefined;

  alojamientos:any=[];
  meses: Combo[];

  alojamiento:string = '';
  mes:string = '';

  visitas:number = 0

  constructor(private alquilerService:AlquileresService) {
    this.alquilerService.obtenerAllAlquileres().subscribe(
      res => {this.alojamientos = res
      },
      err => console.log(err)
    )

    this.meses = [
      {name: 'Enero', code: '1'},
      {name: 'Febrero', code: '2'},
      {name: 'Marzo', code: '3'},
      {name: 'Abril', code: '4'},
      {name: 'Mayo', code: '5'},
      {name: 'Junio', code: '6'},
      {name: 'Julio', code: '7'},
      {name: 'Agosto', code: '8'},
      {name: 'Septiembre', code: '9'},
      {name: 'Octubre', code: '10'},
      {name: 'Noviembre', code: '11'},
      {name: 'Diciembre', code: '12'},
  ];  
  }

  ngOnInit(): void {}

  Buscar(){
    if(this.selectedAlojamiento?.code!=undefined){ this.alojamiento = this.selectedAlojamiento?.code} else { this.alojamiento = '0'}
    if(this.selectedMes?.code!=undefined){ this.mes = this.selectedMes?.code} else { this.mes = '0'}

      this.alquilerService.obtenerClicks({idAlquiler:this.alojamiento, mes:this.mes}).subscribe(
        res => {this.visitas = res[0].clicks},
        err => console.log(err)
      )}

}
