import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, EMPTY, throwError } from 'rxjs';
import { AuthEvents } from './auth-events';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const authEvents = inject(AuthEvents);

  const token = localStorage.getItem('token');

  // Opcional: excluir endpoints públicos
  if (req.url.includes('/auth/login')) {
    return next(req);
  }

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        authEvents.triggerLogout();
        return EMPTY;
      }

      return throwError(() => error);
    })
  );
};
