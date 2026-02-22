import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { catchError, Observable, retry, throwError, timer } from "rxjs";
import { MessageOptions, MessageService } from "../services/message.service";

const MAX_RETRIES = 2;
const UNABLE_RETRY_ON_STATUS = [400, 401, 403, 404, 429];

@Injectable({ providedIn: 'root' })
export class ErrorInterceptor implements HttpInterceptor {
    messageService = inject(MessageService);

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let observable = next.handle(req);

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
            catchError((err) => {
                const message: MessageOptions = {
                    message: err.message,
                    type: 'error',
                }
                this.messageService.showMessage(message);
                return throwError(() => err);
            })
        );
    }
}