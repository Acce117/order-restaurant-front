import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateChildFn, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthUserStore } from "../../core/stores/auth_user.store";
import { AppStore } from "../../core/stores/app.store";

export function isAuthorizedGuard(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const router = inject(Router);
    const authUserStore = inject(AuthUserStore);
    const appStore = inject(AppStore);

    const roles: string[] = route.data['roles'];

    let result: boolean | UrlTree = true;
    if (roles) {
        appStore.previousUrl = state.url;

        const isAuthorized = roles.find((role) => {
            return authUserStore.isAuthorized(role);
        })

        result = !!isAuthorized || router.parseUrl('/auth')
    }

    return true;
}
