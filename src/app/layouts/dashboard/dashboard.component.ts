import { Component, computed, signal } from "@angular/core";
import { Header } from "../../core/components/header/header";
import { RouterLinkWithHref, RouterModule } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { MatSidenavModule } from "@angular/material/sidenav";
import { AppMenu } from "./app-menu/app-menu";
import { MatMenuItem } from "@angular/material/menu";
@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.template.html',
    styleUrl: './dashboard.scss',
    imports: [Header, MatSidenavModule, AppMenu, RouterModule, MatButtonModule, MatMenuItem]
})
export class Dashboard {
    innerWidth = signal(window.innerWidth);
    isOpen = computed(() => this.innerWidth() > 1024);
    drawerMode = computed(() => this.innerWidth() > 1024 ? 'side' : 'over');
    
    constructor() {
        window.onresize = () => {
            this.innerWidth.set(window.innerWidth);
        };
    }

}