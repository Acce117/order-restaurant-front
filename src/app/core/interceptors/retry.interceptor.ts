import { HttpContextToken, HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { Observable, of, retry, throwError, timer } from "rxjs";

export const RETRY_ENABLED = new HttpContextToken<boolean>(() => true);

export function retryInterceptor(req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> {
    let observable = next(req);

    if (req.context.get(RETRY_ENABLED))
        observable = next(req).pipe(
            retry({
                count: 2,
                delay(error, retryCount) {
                    if(error.status === 403) 
                        return throwError(()=>error);
                    
                    return timer(5000 * retryCount);
                },
            })
        );
    
    return observable
}