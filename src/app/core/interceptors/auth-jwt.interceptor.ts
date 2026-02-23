import { HttpContextToken, HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { Observable } from "rxjs";
import { AuthUserStore } from "../stores/auth_user.store";

export const TRY_REFRESH = new HttpContextToken<boolean>(() => true);

export function authJwtInterceptor(req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> {
    const authUserStore = inject(AuthUserStore);
    const refreshingToken = req.context.get(TRY_REFRESH);
    
    if (!refreshingToken)
        if (authUserStore.token)
            req = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${authUserStore.token}`)
            });

    return next(req);
}
