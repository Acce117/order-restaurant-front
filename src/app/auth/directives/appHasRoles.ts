
import { Directive, effect, inject, input, TemplateRef, ViewContainerRef } from "@angular/core";
import { AuthService } from "../services/auth-service";

@Directive({
    selector: '[appHasRoles]'
})
export class AppHasRoles {
    private templateRef = inject(TemplateRef);
    private viewContainerRef = inject(ViewContainerRef);

    private authService = inject(AuthService);

    permission = input.required<string>({ alias: 'appHasRoles'});

    constructor() {
        effect(()=>{
            const isAuthorized = this.authService.isAuthorized(this.permission());

            if(isAuthorized) this.viewContainerRef.createEmbeddedView(this.templateRef);
            else this.viewContainerRef.clear();
        })
    }
}