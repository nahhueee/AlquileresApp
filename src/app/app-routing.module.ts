import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {InicioComponent} from './components/inicio/inicio.component'
import {AlquileresComponent} from './components/alquileres/alquileres.component'
import {ContactoComponent} from './components/contacto/contacto.component'
import {DetalleComponent} from './components/detalle/detalle.component'

const routes: Routes = [{
  path: '',
  redirectTo: '/home',
  pathMatch: 'full'
},
{
  path: 'home',
  component:InicioComponent,
},
{
  path: 'alojamientos',
  component:AlquileresComponent, 
},
{
  path: 'alojamientos/:categoria:/:idcategoria',
  component:AlquileresComponent, 
},
{
  path: 'alojamientos/localidad/:localidad:/:idlocalidad',
  component:AlquileresComponent, 
},
{
  path: 'contacto',
  component:ContactoComponent, 
},
{
  path: 'alojamiento/:nombre/:id',
  component:DetalleComponent, 
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
