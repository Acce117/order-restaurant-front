import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
    selector: 'home',
    template: `
        <router-outlet></router-outlet>
    `,
    imports: [RouterOutlet]
})
export class Home {

}