import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { SessionService } from "../services/session-service";

export const authGuardFn: CanActivateFn = (route) => {
  const session = inject(SessionService);
  const router = inject(Router);

  const role = session.getRole();

  const requiredRoles = route.data?.['roles'] as string[];

  if (!role) {
    console.log(role);
    console.log("GuardFn Ejecutado")
    router.navigate(['/login']);
    return false;
  }

  if (requiredRoles && !requiredRoles.includes(role)) {
    console.log("GuardFn Ejecutado")
    router.navigate(['/access-denied']);
    return false;
  }

  return true;
}
