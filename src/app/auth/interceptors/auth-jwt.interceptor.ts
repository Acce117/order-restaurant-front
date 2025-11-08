import { HttpContextToken, HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { Observable } from "rxjs";
import { AuthUserStore } from "../../core/stores/auth_user.store";

export const REFRESHING_TOKEN = new HttpContextToken<boolean>(() => false);

export function authJwtInterceptor(req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> {
    const authUserStore = inject(AuthUserStore);
    const refreshingToken = req.context.get(REFRESHING_TOKEN);
    
    if (!refreshingToken)
        if (authUserStore.token)
            req = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${authUserStore.token}`)
            });

    return next(req);
}
