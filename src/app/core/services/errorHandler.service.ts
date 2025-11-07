import { HttpErrorResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { MessageService } from "./message.service";
import { AuthUserStore } from "../stores/auth_user.store";

@Injectable({ providedIn: 'root' })
export class ApiErrorHandler {
    private router = inject(Router);
    private messageService = inject(MessageService);
    private authUserStore = inject(AuthUserStore);

    
    handleError(error: HttpErrorResponse): void {
        //TODO handle every kind of error response
        this.messageService.showMessage(
            {
                message: error.message,
                type: 'error',
            }
        );
        
        if([401, 403].includes(error.status)) {
            this.authUserStore.state = null;
            this.router.navigate(['/auth']);
        }
    }
}