import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthService } from "../services/auth-service";

export function isAuthorizedGuard(permission: string): CanActivateFn {
    return (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        const router = inject(Router);
        const authService = inject(AuthService);

        let result: boolean | UrlTree = true;


        // if(!authService.isAuthorized(permission)) {
        //     result = router.parseUrl('forbidden');
        // }

        return result;
    }
}