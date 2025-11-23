import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('authToken');
  console.log('[AuthInterceptor] ejecutado. token=', token);
  let modifiedReq = req;
  if (token) {
    modifiedReq = req.clone({
      setHeaders: { Authorization: `Basic ${token}` }
    });
    console.log('[AuthInterceptor] headers a enviar:', modifiedReq.headers.keys().map(k => `${k}: ${modifiedReq.headers.get(k)}`));
  } else {
    console.log('[AuthInterceptor] No hay token, request sin Authorization');
  }
  return next(modifiedReq);
};
