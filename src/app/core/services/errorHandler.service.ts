import { HttpErrorResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from "@angular/router";
import { MessageService } from "./message.service";

@Injectable({ providedIn: 'root' })
export class ApiErrorHandler {
    private router = inject(Router);
    private snackBar = inject(MatSnackBar);
    private messageService = inject(MessageService);

    
    handleError(error: HttpErrorResponse): void {
        //TODO handle every kind of error response
        this.messageService.showMessage(
            {
                message: error.message,
                type: 'error',
            }
        );
        
        if([401, 403].includes(error.status))
            this.router.navigate(['/auth']);
    }
}