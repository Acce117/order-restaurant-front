import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, GuardResult, MaybeAsync, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { map, tap } from "rxjs";
import { AuthService } from "../services/auth-service";

export function validTokenGuard (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    const jwt = sessionStorage.getItem('jwt');
    const router = inject(Router);
    const authService = inject(AuthService);

    return authService.isValidJwt(jwt as string)
        .pipe(
            tap((res) => !res ? router.parseUrl('/auth') : true)
        );
}