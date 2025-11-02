import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { AuthUserStore } from "../../core/stores/auth_user.store";

export function isAuthorizedGuard(roles: string[]): CanActivateFn {
    return (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        const router = inject(Router);
        const authUserStore = inject(AuthUserStore);

        const isAuthorized = roles.find((role) => {
            return authUserStore.isAuthorized(role);
        })

        return !!isAuthorized || router.parseUrl('/auth');
    }
}