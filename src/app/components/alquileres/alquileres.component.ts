import { Component, OnInit } from '@angular/core';
import { Localidad } from 'src/app/models/localidad';
import { AlquileresService } from 'src/app/services/alquileres.service';

@Component({
  selector: 'app-alquileres',
  templateUrl: './alquileres.component.html',
  styleUrls: ['./alquileres.component.css']
})
export class AlquileresComponent implements OnInit {

  localidades: Localidad[];
  categorias: Localidad[];

  selectedLocality: Localidad | undefined;
  selectedCategory: Localidad | undefined;
  cantPersonas: string = '';

  Alojamientos:any=[];

  constructor(private alquilerService:AlquileresService) {
      this.localidades = [
          {name: 'Mina Clavero', code: '1'},
          {name: 'Villa Cura Brochero', code: '2'},
          {name: 'Las Rosas', code: '3'},
          {name: 'Nono', code: '4'},
          {name: 'San Lorenzo', code: '5'},
          {name: 'Los Hornillos', code: '6'},
         
      ];
      this.categorias = [
        {name: 'Todas', code: '0'},
        {name: 'Hoteles', code: '1'},
        {name: 'Cabañas', code: '2'},
        {name: 'Casas', code: '3'},
        {name: 'Dptos', code: '4'},
        {name: 'Campings', code: '5'}
    ];
  }

  ngOnInit(): void {
  }

  LimpiarFiltros(){
    this.selectedLocality = undefined;
    this.selectedCategory = undefined;
    this.cantPersonas = '';
  }

  Buscar(){
    console.log(this.selectedLocality?.code,this.selectedCategory?.code,this.cantPersonas)
    this.alquilerService.obtenerAlquileres({Localidad:this.selectedLocality?.code,Categoria:this.selectedCategory?.code,Personas:this.cantPersonas}).subscribe(
      res => {this.Alojamientos = res
        console.log(this.Alojamientos)
      },
      err => console.log(err)
    )}
}
