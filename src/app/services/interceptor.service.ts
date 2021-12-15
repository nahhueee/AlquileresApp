import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent} from '@angular/common/http'
import { Observable, observable } from 'rxjs';
import {finalize} from 'rxjs/operators'
import {NgxSpinnerService} from 'ngx-spinner'

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private sppinerService:NgxSpinnerService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.LlamarSpinner()
    return next.handle(req).pipe(
      finalize(()=>this.OcultarSpinner())
    );
  }

  LlamarSpinner(){
    this.sppinerService.show()
  }
  OcultarSpinner(){
    this.sppinerService.hide()
  }
}
