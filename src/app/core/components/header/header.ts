import { Component, computed, inject, input, output } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { RouterModule } from "@angular/router";
import { MatMenuModule } from "@angular/material/menu";
import { AppStore } from "../../stores/app.store";
import { MatBadgeModule } from "@angular/material/badge";
import { MatIcon } from "@angular/material/icon";
import { NotificationComponent } from "../../../notifications/notifications";
import { AuthUserStore } from "../../stores/auth_user.store";
import { CartStore } from "../../../modules/orders/store/cartStore";
import { AuthService } from "../../../modules/auth/services/auth-service";
import { IsAuth } from "../../directives/isAuth";

@Component({
    selector: 'header[appHeader]',
    templateUrl: './header.html',
    styleUrl: './header.scss',
    imports: [MatButtonModule, RouterModule, MatMenuModule, MatBadgeModule, MatIcon, NotificationComponent, IsAuth],
    host: {
        class: 'shadow-md'
    }
})
export class Header {
    appStore = inject(AppStore);
    authUserStore = inject(AuthUserStore);
    cartStore = inject(CartStore);

    badgeHidden = computed(() => this.cartStore.arePendingItems());

    authService = inject(AuthService);

    toggleTheme() {
        this.appStore.toggleTheme();
    }

    logout() {
        this.authService.logout();
    }
}