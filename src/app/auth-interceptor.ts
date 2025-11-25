import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router)

  const token = localStorage.getItem('authToken');
  console.log('[AuthInterceptor] ejecutado. token=', token);
  let modifiedReq = req;
  if (token) {
    modifiedReq = req.clone({
      setHeaders: { Authorization: `Basic ${token}` }
    });
  } else {
    console.log('[AuthInterceptor] No hay token, request sin Authorization');
  }
  return next(modifiedReq);
};
