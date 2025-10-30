import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";


export function authJwtInterceptor(req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> {
    const jwt = sessionStorage.getItem('jwt');

    if (jwt)
        req = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${jwt}`)
        });

    return next(req);
}
