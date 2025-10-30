import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
    selector: 'auth-view',
    templateUrl: './auth.template.html',
    imports: [RouterOutlet]
})
export class AuthView {}
