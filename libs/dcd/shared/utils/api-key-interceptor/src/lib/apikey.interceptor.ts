import { Inject, Injectable, inject } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpInterceptorFn,
  HttpHandlerFn
} from '@angular/common/http';
import { Observable } from 'rxjs';
//import { AppConfig } from '@core/config/app-config';
import { AppConfigService } from '@dcd/shared/utils/app-config';

// @Injectable()
// export class ApiKeyInterceptor implements HttpInterceptor {
//   constructor(private appConfig: AppConfigService) {}

//   intercept(
//     req: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {
//     console.log('apikey', this.appConfig.config.apiKey);
//     // add the header to the cloned request
//     const authReq = req.clone({
//       headers: req.headers.set('x-api-key', this.appConfig.config.apiKey)
//     });

//     return next.handle(authReq);
//   }
// }

export const ApiKeyInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const appConfig = inject(AppConfigService);
  console.log('apikey', appConfig.config.apiKey);
  // add the header to the cloned request
  const authReq = req.clone({
    headers: req.headers.set('x-api-key', appConfig.config.apiKey)
  });

  return next(authReq);
};
