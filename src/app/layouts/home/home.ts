import { Component } from "@angular/core";
import { RouterOutlet, RouterLinkWithHref } from "@angular/router";
import { MatSidenavModule } from "@angular/material/sidenav"
import { Header } from "../../core/components/header/header";
import { MatMenuItem } from "@angular/material/menu";
@Component({
    selector: 'home',
    templateUrl: './home.html',
    imports: [RouterOutlet, MatSidenavModule, Header, RouterLinkWithHref, MatMenuItem]
})
export class Home {

}