import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { AuthUserStore } from '../stores/auth_user.store';

export const authUserGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const authUserStore = inject(AuthUserStore);

  let result: boolean | UrlTree = true
  
  authService.returnUrl = state.url;

  if(!authUserStore.isAuthenticated()) {
    result = router.parseUrl('auth');  
  }

  return result;
};
