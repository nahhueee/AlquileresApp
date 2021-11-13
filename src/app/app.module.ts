import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {ButtonModule} from 'primeng/button';
import { NavegacionComponent } from './components/navegacion/navegacion.component';
import { InicioComponent } from './componets/inicio/inicio.component';

@NgModule({
  declarations: [
    AppComponent,
    NavegacionComponent,
    InicioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
