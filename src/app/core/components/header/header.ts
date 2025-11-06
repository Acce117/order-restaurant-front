import { Component, computed, inject, input, output } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { RouterModule } from "@angular/router";
import { MatMenuModule } from "@angular/material/menu";
import { AppStore } from "../../stores/app.store";
import { AuthService } from "../../../auth/services/auth-service";
import { MatBadgeModule } from "@angular/material/badge";
import { MatIcon } from "@angular/material/icon";
import { CartStore } from "../../../orders/store/cartStore";
import { NotificationComponent } from "../../../notifications/notifications";

@Component({
    selector: 'header[appHeader]',
    templateUrl: './header.html',
    styleUrl: './header.scss',
    imports: [MatButtonModule, RouterModule, MatMenuModule, MatBadgeModule, MatIcon, NotificationComponent],
    host: {
        class: 'shadow-md'
    }
})
export class Header {
    appStore = inject(AppStore);
    toggleDrawer = output();
    
    cartStore = inject(CartStore);

    badgeHidden = computed(() => !this.cartStore.cart());

    authService = inject(AuthService);

    toggleTheme() {
        this.appStore.toggleTheme();
    }

    logout() {
        this.authService.logout();
    }
}