import { Inject, Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
//import { AppConfig } from '@core/config/app-config';
import { AppConfigService } from '@dcd/shared/utils/app-config';

@Injectable()
export class ApiKeyInterceptor implements HttpInterceptor {
  constructor(private appConfig: AppConfigService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add the header to the cloned request
    const authReq = req.clone({
      headers: req.headers.set('x-api-key', this.appConfig.config.apiKey)
    });

    return next.handle(authReq);
  }
}
