import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth-service';

export const authUserGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  
  let result: boolean | UrlTree = true
  
  authService.returnUrl = state.url;

  if(!authService.authUser) {
    result = router.parseUrl('auth');  
  }

  return result;
};
