import { HttpClient, HttpContext } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { tap } from "rxjs";
import { environment } from "../../../environments/environment";
import { RETRY_ENABLED } from "../../core/interceptors/error.interceptor";
import { AuthCredentials } from "../entities/auth_credentials.entity";
import { SignInCredentials } from "../entities/sign_in_credentials.entity";
import { AuthUserStore } from "../../core/stores/auth_user.store";
import { IService } from "../../core/services/service";

interface AuthResponse {
    token: string,
    refreshToken: string,
    user: any
}
@Injectable({ providedIn: 'root' })
export class AuthService implements IService {
    modulePath = 'site';
    http = inject(HttpClient);
    
    private router = inject(Router);
    private authUserStore = inject(AuthUserStore);

    public login(credentials: AuthCredentials) {
        return this.http.post<AuthResponse>(`${environment.API_PATH}/site/login`, credentials, {
            context: new HttpContext().set(RETRY_ENABLED, false),
        }).pipe(
            tap((res) => this.handleResponse(res))
        );
    }

    public signIn(credentials: SignInCredentials) {
        return this.http.post<AuthResponse>(`${environment.API_PATH}/site/sign-in`, credentials, {
            context: new HttpContext().set(RETRY_ENABLED, false),
        }).pipe(
            tap((res) => this.handleResponse(res))
        )
    }

    private handleResponse(res: AuthResponse) {
        sessionStorage.setItem('jwt', res.token);
        sessionStorage.setItem('refresh_jwt', res.refreshToken);
        sessionStorage.setItem('user', JSON.stringify(res.user));

        this.authUserStore.authUser = res.user;
    }

    public logout() {
        this.http.delete(`${environment.API_PATH}/site/log_out`)
            .subscribe(() => {
                sessionStorage.clear();
                this.router.navigate(['auth'])
            });
    }

    public isValidJwt(jwt: string) {
        return this.http.post<boolean>(`${environment.API_PATH}/site/valid-token`, { jwt });
    }
}