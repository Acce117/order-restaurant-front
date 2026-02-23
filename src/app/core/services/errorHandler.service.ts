import { HttpErrorResponse, HttpHandler, HttpRequest } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, switchMap, throwError } from "rxjs";
import { AuthService } from "../../modules/auth/services/auth-service";
import { TRY_REFRESH } from "../interceptors/auth-jwt.interceptor";
import { AuthUserStore } from "../stores/auth_user.store";
import { MessageOptions, MessageService } from "./message.service";

@Injectable({ providedIn: 'root' })
export class ApiErrorHandler {
    private router = inject(Router);
    private messageService = inject(MessageService);
    private authUserStore = inject(AuthUserStore);
    private authService = inject(AuthService);

    handleError(req: HttpRequest<any>, error: HttpErrorResponse, next: HttpHandler): Observable<any> {
        const message: MessageOptions = {
            message: error.message,
            type: 'error',
        }

        if (error.status === 401) {
            const tryRefresh = req.context.get(TRY_REFRESH);

            if (tryRefresh) {
                return this.authService.refreshToken()
                    .pipe(
                        switchMap((res) => {
                            this.authUserStore.tokens = res;

                            const headerConfig = {
                                'Authorization': `Bearer ${res.token}`,
                                'Content-Type': 'application/json'
                            };

                            req = req.clone({ setHeaders: headerConfig });

                            return next.handle(req);
                        }
                        ),
                        catchError((err) => {
                            return throwError(() => err);
                        })
                    );
            }
        }
        else if (error.status === 403) {
            this.authUserStore.state = null;
            this.router.navigate(['/auth']);
        }

        return throwError(() => error);
    }
}