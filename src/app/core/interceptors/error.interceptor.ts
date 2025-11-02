import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { Observable, retry, tap, throwError, timer } from "rxjs";
import { ApiErrorHandler } from "../../error-handler/error_handler";

const MAX_RETRIES = 2;
const UNABLE_RETRY_ON_STATUS = [400, 401, 403, 404];

export function errorInterceptor(req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> {
    let observable = next(req);
    let apiErrorHandler = inject(ApiErrorHandler);

    const delay = (error: any, retryCount: number): Observable<never | 0> => {
        let result: Observable<never | 0>;

        if (UNABLE_RETRY_ON_STATUS.includes(error.status))
            result = throwError(() => error);

        else result = timer(5000 * retryCount);

        return result
    }

    observable = observable.pipe(
        retry({
            count: MAX_RETRIES,
            delay
        }),
    );

    return observable.pipe(
        tap({
            error: (err) => apiErrorHandler.handleError(err)
        })
    );
}