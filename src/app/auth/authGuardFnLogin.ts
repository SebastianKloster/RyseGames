import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { SessionService } from "../services/session-service";

export const authGuardFnLogin: CanActivateFn = () => {
  const session = inject(SessionService);
  const router = inject(Router);

  if (!session.isAuthenticated()) {
    console.log("GuardFnLogin Ejecutado")
    return true;
  }

  router.navigate(['/access-denied-login']);
  console.log("GuardFnLogin Ejecutado")
  return false;
};
