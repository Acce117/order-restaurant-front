import { HttpClient, HttpContext, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { tap } from "rxjs";
import { AuthCredentials } from "../entities/auth_credentials.entity";
import { SignInCredentials } from "../entities/sign_in_credentials.entity";
import { IService } from "../../../core/services/service";
import { AppStore } from "../../../core/stores/app.store";
import { AuthUserStore } from "../../../core/stores/auth_user.store";
import { environment } from "../../../../environments/environment";
import { TRY_REFRESH } from "../../../core/interceptors/auth-jwt.interceptor";

interface AuthResponse {
    token: string,
    refreshToken: string,
    user: any
}
@Injectable({ providedIn: 'root' })
export class AuthService implements IService {
    modulePath = 'site';
    http = inject(HttpClient);
    appStore = inject(AppStore);

    private router = inject(Router);
    private authUserStore = inject(AuthUserStore);

    public login(credentials: AuthCredentials) {
        return this.http.post<AuthResponse>(`${environment.API_PATH}/site/login`, credentials,
            {
                context: new HttpContext().set(TRY_REFRESH, false),
            }
        ).pipe(
            tap((res) => this.authUserStore.state = res)
        );
    }

    public signIn(credentials: SignInCredentials) {
        return this.http.post<AuthResponse>(`${environment.API_PATH}/site/sign-in`, credentials).pipe(
            tap((res) => this.authUserStore.state = res)
        )
    }

    public logout() {
        this.http.delete(`${environment.API_PATH}/site/log-out`)
            .subscribe(() => {
                this.appStore.previousUrl = null;
                this.authUserStore.state = null;
                this.router.navigate(['auth'])
            });
    }

    public isValidJwt(jwt: string) {
        return this.http.post<boolean>(`${environment.API_PATH}/site/valid-token`, { jwt });
    }

    public refreshToken() {
        return this.http.get<{ token: string, refreshToken: string }>(`${environment.API_PATH}/site/refresh`, {
            headers: new HttpHeaders().append('Authorization', `Bearer ${this.authUserStore.refreshToken as string}`),
            context: new HttpContext().set(TRY_REFRESH, false),
        });
    }
}