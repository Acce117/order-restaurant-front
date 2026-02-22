import { HttpErrorResponse, HttpHandler, HttpHandlerFn, HttpHeaders, HttpRequest } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { MessageOptions, MessageService } from "./message.service";
import { AuthUserStore } from "../stores/auth_user.store";
import { catchError, Observable, of, switchMap, tap, throwError } from "rxjs";
import { AuthService } from "../../modules/auth/services/auth-service";

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

        // if (error.status === 401) {
        //     const isRefreshing = req.context.get(REFRESHING_TOKEN);

        //     if (!isRefreshing) {
        //         return this.authService.refreshToken()
        //             .pipe(
        //                 switchMap((res) => {
        //                     this.authUserStore.tokens = res;

        //                     const headerConfig = {
        //                         'Authorization': `Bearer ${res.token}`,
        //                         'Content-Type': 'application/json'
        //                     };

        //                     req = req.clone({ setHeaders: headerConfig });

        //                     return next.handle(req);
        //                 }
        //                 ),
        //                 catchError((err) => {
        //                     this.messageService.showMessage(message);
        //                     return throwError(() => err);
        //                 })
        //             );
        //     }
        // }
        // else if (error.status === 403) {
        //     this.authUserStore.state = null;
        //     this.router.navigate(['/auth']);
        // }

        return throwError(() => error);
    }
}