import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SlickCarouselModule } from 'ngx-slick-carousel';
import {NgxPaginationModule} from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {ScrollTopModule} from 'primeng/scrolltop';
import {DropdownModule} from 'primeng/dropdown';

import { NavegacionComponent } from './components/navegacion/navegacion.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { AlquileresComponent } from './components/alquileres/alquileres.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { DetalleComponent } from './components/detalle/detalle.component';


@NgModule({
  declarations: [
    AppComponent,
    NavegacionComponent,
    InicioComponent,
    AlquileresComponent,
    ContactoComponent,
    DetalleComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SlickCarouselModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    ScrollTopModule,
    DropdownModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
