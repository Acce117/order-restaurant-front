import { HttpErrorResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import {MatSnackBar} from '@angular/material/snack-bar';
import { ErrorMessage } from "./error_message/error_message.component";
import { Router } from "@angular/router";

@Injectable({ providedIn: 'root' })
export class ApiErrorHandler {
    private router = inject(Router);
    private snackBar = inject(MatSnackBar);

    durationInSeconds = 5;

    openSnackBar(message: string) {
        this.snackBar.openFromComponent(ErrorMessage, {
            duration: this.durationInSeconds * 1000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
            data: { message },
            panelClass: ['error-snackbar']
        });
    }
    
    handleError(error: HttpErrorResponse): void {
        //TODO handle every kind of error response
        this.openSnackBar(error.message);
        
        if([401, 403].includes(error.status))
            this.router.navigate(['/auth']);
        
        console.error('An error occurred:', error);
    }
}