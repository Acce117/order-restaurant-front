import { Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { AuthUserStore } from "../../../core/stores/auth_user.store";
import { NgOptimizedImage } from "@angular/common";

@Component({
    selector: 'user-profile',
    templateUrl: './profile.html',
    imports: [MatInputModule, MatButtonModule],
})
export class UserProfile {
    authUserStore = inject(AuthUserStore);

    user = this.authUserStore.user;
}