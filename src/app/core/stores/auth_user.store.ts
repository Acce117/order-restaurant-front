import { effect, Injectable, signal } from "@angular/core";

interface AuthState {
    user: {
        id: number;
        email: string;
        username: string;
        role: string;
    };
    token: string;
    refreshToken: string;
}
@Injectable({ providedIn: 'root' })
export class AuthUserStore {
    private authState = signal<AuthState | null>(null);

    constructor() {
        const state = localStorage.getItem('state');
        if (state) this.authState.set(JSON.parse(state));

        effect(() => {
            const authState = this.authState();
            if (authState)
                localStorage.setItem('state', JSON.stringify(authState));
            else localStorage.clear();
        })
    }

    set state(user: AuthState | null) {
        this.authState.set(user);
    }

    get user() {
        return { ...this.authState()?.user };
    }

    public isAuthorized(roleName: string): boolean {
        return this.authState()!.user.role === roleName;
    }

    public isAuthenticated(): boolean {
        return this.authState() !== null;
    }

    get token(): string | undefined {
        return this.authState()?.token;
    }

    set tokens(tokens: {token: string, refreshToken: string}) {
        this.authState.update((value) => {
            return {
                user: value!.user,
                token: tokens.token,
                refreshToken: tokens.refreshToken
            }
        })
    }

    get refreshToken(): string | undefined {
        return this.authState()?.refreshToken;
    }
}