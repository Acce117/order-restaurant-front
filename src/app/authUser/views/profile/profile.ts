import { Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { AuthUserStore } from "../../../core/stores/auth_user.store";

@Component({
    selector: 'user-profile',
    templateUrl: './profile.html',
    styleUrl: './profile.scss',
    imports: [MatInputModule, MatButtonModule],
})
export class UserProfile {
    authUserStore = inject(AuthUserStore);

    user = this.authUserStore.user;
}