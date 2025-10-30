import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { map } from "rxjs";
import { environment } from "../../../environments/environment";
import { AuthService } from "../services/auth-service";

export const validTokenGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    
    const http = inject(HttpClient);
    const jwt = sessionStorage.getItem('jwt');
    const router = inject(Router);
    const authService = inject(AuthService);

    return http.post(`${environment.API_PATH}/site/valid-token`, { jwt })
        .pipe(
            map((res) => {
                let result: boolean | UrlTree = true
                if(!res) {
                    authService.returnUrl = state.url;
                    result = router.parseUrl('/auth') 
                }
                
                return result;
            } ),
        )
}