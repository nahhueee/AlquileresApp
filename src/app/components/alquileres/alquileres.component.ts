import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';
import { Combo } from 'src/app/models/combo';
import { AlquileresService } from 'src/app/services/alquileres.service';

@Component({
  selector: 'app-alquileres',
  templateUrl: './alquileres.component.html',
  styleUrls: ['./alquileres.component.css']
})
export class AlquileresComponent implements OnInit {
  public isCollapsed = true;
  page:number=1;
  click: boolean = false;
  localidades: Combo[];
  categorias: Combo[];

  selectedLocality: Combo | undefined;
  selectedCategory: Combo | undefined;
  cantPersonas: string = '';
  localidad:string = '';
  categoria:string = '';

  resultados:number = 0
  Alojamientos:any=[];

  Servicios = [
    {id: 1, name: "WI-FI", isSelected: false},
    {id: 2, name: "Cochera", isSelected: false},
    {id: 3, name: "Pileta", isSelected: false},
    {id: 4, name: "Aire Acondicionado", isSelected: false},
    {id: 5, name: "Calefaccion", isSelected: false},
    {id: 11, name: "TV", isSelected: false},
    {id: 14, name: "Mascotas", isSelected: false},
    {id: 15, name: "Desayuno", isSelected: false},
    {id: 7, name: "Patio", isSelected: false},
  ];

  constructor(private titlepage:Title, private alquilerService:AlquileresService, private rutaActiva:ActivatedRoute) {
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
    this.titlepage.setTitle('Alojamientos')

    this.rutaActiva.params.subscribe(
      (params: Params) => {
        if(params.idlocalidad!=undefined){

          if(params.idlocalidad==1){
            this.selectedLocality= {name: 'Mina Clavero', code: '1'}
          }
          if(params.idlocalidad==2){
            this.selectedLocality= {name: 'Nono', code: '2'}
          }
          if(params.idlocalidad==3){
            this.selectedLocality= {name: 'Villa Cura Brochero', code: '3'}
          }
          if(params.idlocalidad==4){
            this.selectedLocality= {name: 'Las Rosas', code: '4'}
          }
          if(params.idlocalidad==5){
            this.selectedLocality=  {name: 'San Lorenzo', code: '5'}
          }
          if(params.idlocalidad==6){
            this.selectedLocality=  {name: 'Los Hornillos', code: '6'}
          }

          this.Buscar()
        };

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
        }
      
      }
     
  );

  }

  LimpiarFiltros(){
    this.Alojamientos=[];
    this.click=false
    this.selectedLocality = undefined;
    this.selectedCategory = undefined;
    this.cantPersonas = '';
    
    this.Servicios.forEach(function(elemento) {
      elemento.isSelected = false
  })
  }

  Buscar(){
    this.click=true
    if(this.selectedLocality?.code!=undefined){ this.localidad = this.selectedLocality?.code} else { this.localidad = '0'}
    if(this.selectedCategory?.code!=undefined){ this.categoria = this.selectedCategory?.code} else { this.categoria = '0'}
    
    
      this.alquilerService.obtenerAlquileres({Localidad:this.localidad,Categoria:this.categoria,Personas:this.cantPersonas,Servicios:this.Servicios}).subscribe(
        res => {this.Alojamientos = res
         console.log(res)
         
          this.resultados = this.Alojamientos.length
         
        },
        err => console.log(err)
      )}
}
