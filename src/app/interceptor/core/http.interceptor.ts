import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../enviornments/environment';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const apiUrl = environment.apiBaseUrl;

  // Prepend the base URL only if the URL is relative
  const modifiedReq = req.url.startsWith('http')
    ? req
    : req.clone({ url: `${apiUrl}/${req.url}` });

  return next(modifiedReq);
};
