import { Component } from "@angular/core";
import { Header } from "../../core/components/header/header";
import { RouterOutlet } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { MatSidenavModule } from "@angular/material/sidenav";
import { AppMenu } from "./app-menu/app-menu";
@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.template.html',
    styleUrl: './dashboard.scss',
    imports: [Header, MatSidenavModule, AppMenu, RouterOutlet, MatButtonModule]
})
export class Dashboard {

}