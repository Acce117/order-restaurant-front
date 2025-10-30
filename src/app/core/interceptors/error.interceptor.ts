import { HttpContextToken, HttpEvent, HttpHandlerFn, HttpRequest, HttpResponseBase } from "@angular/common/http";
import { asyncScheduler, Observable, retry, scheduled, tap, throwError, timer } from "rxjs";
import { ApiErrorHandler } from "../../error-handler/error_handler";
import { inject } from "@angular/core";

export const RETRY_ENABLED = new HttpContextToken<boolean>(() => true);

const MAX_RETRIES = 2;
const UNABLE_RETRY_STATUS = [400, 401, 403, 404];

export function errorInterceptor(req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> {
    let observable = next(req);
    let apiErrorHandler = inject(ApiErrorHandler);

    if (req.context.get(RETRY_ENABLED)) {
        const delay = (error: any, retryCount: number): Observable<never | 0> => {
            let result: Observable<never | 0>;

            if (UNABLE_RETRY_STATUS.includes(error.status)) 
                result = throwError(() => error);

            else result = timer(5000 * retryCount);

            return result
        }

        observable = observable.pipe(
            retry({
                count: MAX_RETRIES,
                delay
            }),
            tap({
                error: (err) => apiErrorHandler.handleError(err)
            })
        );
    }

    return observable
}