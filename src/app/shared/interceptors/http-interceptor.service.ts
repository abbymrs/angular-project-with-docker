import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoadingIndicatorService } from '../service/loading-indicator.service';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(
    private loadingIndicatorService: LoadingIndicatorService
  ) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loadingIndicatorService.start(req);

    return next.handle(req).pipe(
      tap(
        event => {
          if (event instanceof HttpResponse) {
            this.loadingIndicatorService.finish(req);
          }
        },
        err => {
          this.loadingIndicatorService.finish(req);
        }
      )
    )
  }
}
