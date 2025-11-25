import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { SessionService } from "../services/session-service";

export const authGuardFnLogin: CanActivateFn = () => {
  const router = inject(Router);

  if (!localStorage.getItem('loggedUser')) {
    return true;
  }

  router.navigate(['/access-denied-login']);
  return false;
};
