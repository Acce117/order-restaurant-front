import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { Observable } from "rxjs";
import { AuthUserStore } from "../../core/stores/auth_user.store";


export function authJwtInterceptor(req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> {
    const authUserStore = inject(AuthUserStore);

    if (authUserStore.getToken())
        req = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${authUserStore.getToken()}`)
        });

    return next(req);
}
