import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SlickCarouselModule } from 'ngx-slick-carousel';
import {NgxPaginationModule} from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {ScrollTopModule} from 'primeng/scrolltop';
import {DropdownModule} from 'primeng/dropdown';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import { NgxSpinnerModule } from "ngx-spinner";
import {TooltipModule} from 'primeng/tooltip';

import { NavegacionComponent } from './components/navegacion/navegacion.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { AlquileresComponent } from './components/alquileres/alquileres.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { DetalleComponent } from './components/detalle/detalle.component';
import { LocalidadesComponent } from './components/localidades/localidades.component';
import { DetZonaComponent } from './components/det-zona/det-zona.component';
import { DatosComponent } from './components/datos/datos.component';
import { InterceptorService } from './services/interceptor.service';
import { VerificacionComponent } from './components/verificacion/verificacion.component';
import { NotfoundComponent } from './components/notfound/notfound.component';


@NgModule({
  declarations: [
    AppComponent,
    NavegacionComponent,
    InicioComponent,
    AlquileresComponent,
    ContactoComponent,
    DetalleComponent,
    LocalidadesComponent,
    DetZonaComponent,
    DatosComponent,
    VerificacionComponent,
    NotfoundComponent
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
    NgxPaginationModule,
    LeafletModule,
    MessagesModule,
    MessageModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    TooltipModule
    ],
  providers: [{provide:HTTP_INTERCEPTORS, useClass: InterceptorService, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }


// {provide: LocationStrategy, useClass: HashLocationStrategy}