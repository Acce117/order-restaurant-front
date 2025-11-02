
import { Directive, effect, inject, input, TemplateRef, ViewContainerRef } from "@angular/core";
import { AuthUserStore } from "../../core/stores/auth_user.store";

@Directive({
    selector: '[appHasRoles]'
})
export class AppHasRoles {
    private templateRef = inject(TemplateRef);
    private viewContainerRef = inject(ViewContainerRef);

    private authUserStore = inject(AuthUserStore);

    role = input.required<string[]>({ alias: 'appHasRoles'});

    constructor() {
        effect(()=>{
            const isAuthorized = this.role().find((role) => {
                return this.authUserStore.isAuthorized(role);
            })

            if(isAuthorized) this.viewContainerRef.createEmbeddedView(this.templateRef);
            else this.viewContainerRef.clear();
        })
    }
}