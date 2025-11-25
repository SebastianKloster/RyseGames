import { Injectable, inject } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { SessionService } from '../services/session-service';

export const authGuardFn: CanActivateFn = (route) => {
  const session = inject(SessionService);
  const router = inject(Router);

  const role = session.getRole();
  const requiredRoles = route.data?.['roles'] as string[];

  if (!session.isAuthenticated()) {
    console.log("Guard Ejecutado")
    router.navigate(['/login']);
    return false;
  }

  if (requiredRoles && !requiredRoles.includes(role)) {
    console.log("Guard Ejecutado")
    router.navigate(['/access-denied']);
    return false;
  }

  return true;
};
