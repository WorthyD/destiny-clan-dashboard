import {  inject } from '@angular/core';
import {
  HttpRequest,
  HttpInterceptorFn,
  HttpHandlerFn
} from '@angular/common/http';
import { AppConfigService } from '@dcd/shared/utils/app-config';

export const ApiKeyInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const appConfig = inject(AppConfigService);
  // add the header to the cloned request
  const authReq = req.clone({
    headers: req.headers.set('x-api-key', appConfig.config.apiKey)
  });

  return next(authReq);
};
