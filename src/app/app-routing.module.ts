import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {InicioComponent} from './components/inicio/inicio.component'
import {AlquileresComponent} from './components/alquileres/alquileres.component'

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
  path: 'alojamientos/:categoria:/:id',
  component:AlquileresComponent, 
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
