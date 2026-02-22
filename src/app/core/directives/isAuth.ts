
import { Directive, effect, inject, TemplateRef, ViewContainerRef } from "@angular/core";
import { AuthUserStore } from "../stores/auth_user.store";


@Directive({
    selector: '[isAuth]'
})
export class IsAuth {
    private templateRef = inject(TemplateRef);
    private viewContainerRef = inject(ViewContainerRef);

    private authUserStore = inject(AuthUserStore);

    constructor() {
        effect(() => {
            const isAuth = this.authUserStore.isAuthenticated();
            if (isAuth) {
                if (this.viewContainerRef.length === 0)
                    this.viewContainerRef.createEmbeddedView(this.templateRef);
            }
            else this.viewContainerRef.clear();
        })
    }
}