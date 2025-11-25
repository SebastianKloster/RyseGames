import { Injectable, inject } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { SessionService } from '../services/session-service';

export const authGuardFn: CanActivateFn = (route) => {
  const session = inject(SessionService);
  const router = inject(Router);

  const role = session.getRole();
  const requiredRoles = route.data?.['roles'] as string[];

  if (!session.isAuthenticated()) {
    router.navigate(['/login']);
    return false;
  }

  if (requiredRoles && !requiredRoles.includes(role)) {
    router.navigate(['/not-authorized']);
    return false;
  }

  return true;
};
