import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { EMPTY, Observable, switchMap } from "rxjs";
import { AuthService } from "../services/auth-service";

export function validJwtInterceptor(req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> {
    const jwt = sessionStorage.getItem('jwt');
    const router = inject(Router);
    const authService = inject(AuthService);

    return authService.isValidJwt(jwt as string)
        .pipe(
            switchMap((res) => {
                let result: Observable<HttpEvent<any>> = EMPTY;

                if (res) result = next(req);
                else router.navigate(['/auth']);
                
                return result;
            })
        );
}