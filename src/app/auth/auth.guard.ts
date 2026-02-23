import { Injectable, inject } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { SessionService } from '../services/session-service';
import { filter, map, take } from 'rxjs';

export const authGuardFn: CanActivateFn = (route) => {
  const session = inject(SessionService);
  const router = inject(Router);
  const requiredRoles = route.data?.['roles'] as string[];

  return session.isLoading$.pipe(
    filter(loading => !loading),
    take(1),
    map(() => {

      console.log("isLoggedIn? = "+session.isLoggedIn())
      if (!session.isLoggedIn()) {
        console.log("Guard Ejecutado")
        router.navigate(['/login']);
        return false;
      }

      if (requiredRoles && !requiredRoles.includes(session.getRole())) {
        console.log("Guard Ejecutado")
        router.navigate(['/access-denied']);
        return false;
      }

      return true;
    })
  );
};
