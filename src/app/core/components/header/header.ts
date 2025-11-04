import { Component, inject, input, output } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { RouterModule } from "@angular/router";
import { MatMenuModule } from "@angular/material/menu";
import { AppStore } from "../../stores/app.store";
import { AuthService } from "../../../auth/services/auth-service";

@Component({
    selector: 'header[appHeader]',
    templateUrl: './header.html',
    styleUrl: './header.scss',
    imports: [MatButtonModule, RouterModule, MatMenuModule]
})
export class Header {
    appStore = inject(AppStore);
    toggleDrawer = output();

    authService = inject(AuthService);

    toggleTheme() {
        this.appStore.toggleTheme();
    }

    logout() {
        this.authService.logout();
    }
}