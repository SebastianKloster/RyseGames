import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = sessionStorage.getItem('authToken');
  console.log('[AuthInterceptor] ejecutado. token=', token);
  let modifiedReq = req;
  if (token) {
    modifiedReq = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  } else {
    console.log('[AuthInterceptor] No hay token, request sin Authorization');
  }
  return next(modifiedReq);
};
