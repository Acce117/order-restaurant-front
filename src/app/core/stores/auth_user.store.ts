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
    private authState = signal<AuthState | null>(null); //TODO type user

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

    set state(user: any) {
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
}