import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class AuthUserStore {
    private user: any = null; //TODO type user

    constructor() {
        const user = sessionStorage.getItem('user');
        if (user) this.user = JSON.parse(user);
    }

    set authUser(user: any) {
        this.user = user;
    }

    public isAuthorized(roleName: string): boolean {
        return this.user.role === roleName;
    }

    public isAuthenticated(): boolean {
        return this.user !== null;
    }
}