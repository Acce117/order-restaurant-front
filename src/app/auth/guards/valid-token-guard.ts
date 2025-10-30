import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { environment } from "../../../environments/environment";
import { catchError, map, of, } from "rxjs";
import { AuthService } from "../services/auth-service";
// import { NotificationService } from "../../alert/notificationService";

export const validTokenGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const http = inject(HttpClient);
    const jwt = sessionStorage.getItem('jwt');
    const router = inject(Router);
    const authService = inject(AuthService);

    // const notificationService = inject(NotificationService);

    return http.post(`${environment.API_PATH}/site/valid_token`, { jwt })
        .pipe(
            map((res) => {
                let result: boolean | UrlTree = true
                if(!res) {
                    authService.returnUrl = state.url;
                    result = router.parseUrl('/auth') 
                }
                
                return result;
            } ),
            catchError((err) => {
                // if (err.status === 500) notificationService.notifyError('Server is not available right now');
                return of(false)
            })
        )
}