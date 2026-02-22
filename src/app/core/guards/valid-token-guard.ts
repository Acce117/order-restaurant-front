import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { map } from "rxjs";
import { AuthService } from "../../modules/auth/services/auth-service";
import { AuthUserStore } from "../stores/auth_user.store";
import { AppStore } from "../stores/app.store";

export function validTokenGuard (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    const router = inject(Router);
    const authUserStore = inject(AuthUserStore);
    const authService = inject(AuthService);
    const appStore = inject(AppStore);

    appStore.previousUrl = state.url;
    
    return authService.isValidJwt(authUserStore.token as string)
        .pipe(
            map((res) => !res ? router.parseUrl('/auth') : true)
        );
}