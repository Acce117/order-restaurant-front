import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AppStore } from '../../core/stores/app.store';
import { AuthUserStore } from '../../core/stores/auth_user.store';

export const authUserGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authUserStore = inject(AuthUserStore);
  const appStore = inject(AppStore);

  let result: boolean | UrlTree = true
  
  appStore.previousUrl = state.url;

  if(!authUserStore.isAuthenticated()) {
    result = router.parseUrl('auth');  
  }

  return result;
};
