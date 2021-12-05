import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Localidad } from 'src/app/models/localidad';
import { AlquileresService } from 'src/app/services/alquileres.service';

@Component({
  selector: 'app-alquileres',
  templateUrl: './alquileres.component.html',
  styleUrls: ['./alquileres.component.css']
})
export class AlquileresComponent implements OnInit {
  page:number=1;
  click: boolean = false;
  localidades: Localidad[];
  categorias: Localidad[];

  selectedLocality: Localidad | undefined;
  selectedCategory: Localidad | undefined;
  cantPersonas: string = '';
  localidad:string = '';
  categoria:string = '';

  resultados:number = 0
  Alojamientos:any=[];

  constructor(private alquilerService:AlquileresService, private rutaActiva:ActivatedRoute) {
      this.localidades = [
          {name: 'Mina Clavero', code: '1'},
          {name: 'Nono', code: '2'},
          {name: 'Villa Cura Brochero', code: '3'},
          {name: 'Las Rosas', code: '4'},
          {name: 'San Lorenzo', code: '5'},
          {name: 'Los Hornillos', code: '6'},
         
      ];
      this.categorias = [
        {name: 'Todas', code: '0'},
        {name: 'Casas o Chalets', code: '1'},
        {name: 'Dptos o Duplex', code: '2'},
        {name: 'Cabañas o Bungalows', code: '3'},
        {name: 'Hoteles', code: '4'},
        {name: 'Campings', code: '5'}
    ];
  }

  ngOnInit(): void {
    this.rutaActiva.params.subscribe(
      (params: Params) => {
        if(params.idcategoria!=undefined){

          if(params.idcategoria==1){
            this.selectedCategory= {name: 'Casas o Chalets', code: '1'}
          }
          if(params.idcategoria==2){
            this.selectedCategory= {name: 'Dptos o Duplex', code: '2'}
          }
          if(params.idcategoria==3){
            this.selectedCategory= {name: 'Cabañas o Bungalows', code: '3'}
          }
          if(params.idcategoria==4){
            this.selectedCategory= {name: 'Hoteles', code: '4'}
          }
          if(params.idcategoria==5){
            this.selectedCategory= {name: 'Campings', code: '5'}
          }

          if(params.idcategoria==6){
            this.alquilerService.obtenerTopAlquileres().subscribe(
              res => {this.Alojamientos = res,
                      this.resultados = this.Alojamientos.length},
              err => console.log(err))

              
              this.click=true  
          }else{
            this.Buscar()
          }
         
        };
      }
  );

  }

  LimpiarFiltros(){
    this.Alojamientos=[];
    this.click=false
    this.selectedLocality = undefined;
    this.selectedCategory = undefined;
    this.cantPersonas = '';
  }

  Buscar(){
    this.click=true
    if(this.selectedLocality?.code!=undefined){ this.localidad = this.selectedLocality?.code} else { this.localidad = '0'}
    if(this.selectedCategory?.code!=undefined){ this.categoria = this.selectedCategory?.code} else { this.categoria = '0'}
    
    
      this.alquilerService.obtenerAlquileres({Localidad:this.localidad,Categoria:this.categoria,Personas:this.cantPersonas}).subscribe(
        res => {this.Alojamientos = res
         this.resultados = this.Alojamientos.length
        },
        err => console.log(err)
      )}
}
