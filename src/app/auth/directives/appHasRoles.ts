
import { Directive, effect, inject, input, TemplateRef, ViewContainerRef } from "@angular/core";
import { AuthService } from "../services/auth-service";
import { AuthUserStore } from "../stores/auth_user.store";

@Directive({
    selector: '[appHasRoles]'
})
export class AppHasRoles {
    private templateRef = inject(TemplateRef);
    private viewContainerRef = inject(ViewContainerRef);

    private authUserStore = inject(AuthUserStore);

    role = input.required<string>({ alias: 'appHasRoles'});

    constructor() {
        effect(()=>{
            const isAuthorized = this.authUserStore.isAuthorized(this.role());

            if(isAuthorized) this.viewContainerRef.createEmbeddedView(this.templateRef);
            else this.viewContainerRef.clear();
        })
    }
}