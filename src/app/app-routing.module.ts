import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {InicioComponent} from './components/inicio/inicio.component'
import {AlquileresComponent} from './components/alquileres/alquileres.component'
import {ContactoComponent} from './components/contacto/contacto.component'
import {DetalleComponent} from './components/detalle/detalle.component'
import {LocalidadesComponent} from './components/localidades/localidades.component'
import {DetZonaComponent} from './components/det-zona/det-zona.component'
import {DatosComponent} from './components/datos/datos.component'
import {VerificacionComponent} from './components/verificacion/verificacion.component'
import {NotfoundComponent} from './components/notfound/notfound.component'
import {InfoComponent} from './components/info/info.component'
import { ServiciosComponent } from './components/register/servicios/servicios.component';
import { GeneralesComponent } from './components/register/generales/generales.component';
import { DatoContactoComponent } from './components/register/dato-contacto/dato-contacto.component';
import { CondicionesComponent } from './components/register/condiciones/condiciones.component';
import { ConfirmacionComponent } from './components/register/confirmacion/confirmacion.component';

const routes: Routes = [
  {
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
},
{
  path: 'localidades',
  component:LocalidadesComponent, 
},
{
  path: 'localidad/:nombre/:id',
  component:DetZonaComponent, 
},

{
  path: 'register',
  component:DatosComponent, 
},
{
  path: 'correcto',
  component:VerificacionComponent, 
},
{
  path: 'information',
  component:InfoComponent, 
},

{
  path: 'registro',
  component:GeneralesComponent, 
},
{
  path: 'registro/general',
  component:GeneralesComponent, 
},
{
  path: 'registro/servicios',
  component:ServiciosComponent, 
},
{
  path: 'registro/contacto',
  component:DatoContactoComponent, 
},
{
  path: 'registro/condiciones',
  component:CondicionesComponent, 
},
{
  path: 'registro/confirmacion',
  component:ConfirmacionComponent, 
},


{path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
