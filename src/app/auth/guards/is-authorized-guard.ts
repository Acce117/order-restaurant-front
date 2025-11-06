import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateChildFn, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { AuthUserStore } from "../../core/stores/auth_user.store";
import { AppStore } from "../../core/stores/app.store";

export function isAuthorizedGuard(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const roles: string[] = route.data['roles'];

    const router = inject(Router);
    const authUserStore = inject(AuthUserStore);
    const appStore = inject(AppStore);

    appStore.previousUrl = state.url;

    const isAuthorized = roles.find((role) => {
        return authUserStore.isAuthorized(role);
    })

    return !!isAuthorized || router.parseUrl('/auth');
}
