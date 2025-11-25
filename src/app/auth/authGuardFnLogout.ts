import { CanActivateFn, Router } from "@angular/router";
import { SessionService } from "../services/session-service";
import { inject } from "@angular/core";

export const authGuardFnLogout: CanActivateFn = () => {
  const session = inject(SessionService);
  const router = inject(Router);

  if (!session.isAuthenticated()) {
    console.log("GuardFnLogout Ejecutado")
    router.navigate(['/login']);
    return false;
  }

  return true;
}
