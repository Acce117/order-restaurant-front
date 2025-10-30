import { HttpClient, HttpContext, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { tap } from "rxjs";
import { Router } from "@angular/router";
// import { NotificationService } from "../../alert/notificationService";
import { RETRY_ENABLED } from "../../core/interceptors/retry.interceptor";
import qs from "qs";
// import { PayRequest } from "../../users/entities/pay-request";
import { GetAllData } from "../../core/services/service";

@Injectable({ providedIn: 'root' })
export class AuthService {
    private user: any = null;
    private http = inject(HttpClient);
    private router = inject(Router);
    // private notificationService = inject(NotificationService);

    returnUrl: string | null = null;

    constructor() {
        const user = sessionStorage.getItem('user');
        if (user) this.user = JSON.parse(user);
    }

    public login(credentials: { email: string, password: string }) {
        return this.http.post<{ token: string, refresh_token: string, user: any }>(`${environment.API_PATH}/site/login`, credentials, {
            context: new HttpContext().set(RETRY_ENABLED, false),
        }).pipe(
            tap(
                {
                    next: (res) => this.handleResponse(res),
                    error: (err) => {
                        // // if (err.status === 401) this.notificationService.notifyError('Wrong credentials');
                        // // else if (err.status === 500) this.notificationService.notifyError('Server is not available right now');
                        // else { console.log(err) }
                    }
                }
            )
        );
    }

    private handleResponse(res: { token: string, refresh_token: string, user: any }) {
        sessionStorage.setItem('jwt', res.token);
        sessionStorage.setItem('refresh_jwt', res.refresh_token);
        sessionStorage.setItem('user', JSON.stringify(res.user));
        this.user = res.user;
        this.returnUrl ? this.router.navigate([this.returnUrl]) : this.router.navigate(['']);
    }

    public logout() {
        this.http.delete(`${environment.API_PATH}/site/log_out`)
            .subscribe({
                next: () => {
                    sessionStorage.clear();
                    this.router.navigate(['auth'])
                },
                error: (err) => {
                    // if (err.status === 401) this.notificationService.notifyError('Unauthorized');
                    // else if (err.status === 500) this.notificationService.notifyError('Server is not available right now');
                    // else { console.log(err) }
                }
            })
    }

    get authUser() {
        let user = null;
        if (this.user)
            user = {
                ...this.user,
                role: {
                    ...this.user.role,
                    permissions: undefined
                }
            };

        return user;
    }

    private get userPermissions() {
        let permissions: {
            code: string,
            module: string,
            controller: string,
            action: string,
        }[] = [];

        if (this.user)
            permissions = [...this.user.role.permissions];

        return permissions;
    }

    isAuthorized(permissionCode: string) {
        const permissions = this.userPermissions;

        const permission = permissions.find((p) => p.code === permissionCode);

        return !!permission;
    }
}