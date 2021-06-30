import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoaderService } from './loader.service';
import { catchError, delay, tap } from 'rxjs/operators';

@Injectable()
export class HttpLoaderInterceptor implements HttpInterceptor {

  constructor(private loaderService: LoaderService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

      
    // al hacer la llamada http, le decimos que muestre el spinner
    this.loaderService.showLoading(request.url);

    // estamos atento de cuando ocultar
    return next.handle(request).pipe(
      delay(2000),
      // en caso de fallo en la respuesta traida del servidor, ocultamos también el spinner
      catchError((e) => {
        this.loaderService.hideLoading(request.url);
        return e;
      }), // cuando tenga un objeto que sea de respuesta, nos lo oculte el spinner
      tap((evt: any) => {
        if (evt instanceof HttpResponse) {
          this.loaderService.hideLoading(request.url);
       } 
      })
    );
  }
}
