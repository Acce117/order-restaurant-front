import { HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, tap } from "rxjs";
import { AuthService } from "../services/auth-service";

export function validJwtInterceptor(req: HttpRequest<any>, next: HttpHandlerFn): Observable<boolean> {
    const jwt = sessionStorage.getItem('jwt');
    const router = inject(Router);
    const authService = inject(AuthService);

    return authService.isValidJwt(jwt as string)
        .pipe(
            tap((res) => !res ? router.parseUrl('/auth') : true)
        );
}