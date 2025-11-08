import { inject, Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ErrorMessage } from "../components/messages/error_message.component";
import { SuccessMessage } from "../components/messages/success_message.component";

export interface MessageOptions {
    type: 'error' | 'success';
    message: string;
}

const snackBars = {
    'error': { component: ErrorMessage, style: 'error-snackbar' },
    'success': { component: SuccessMessage, style: 'success-snackbar' }
}

@Injectable({ providedIn: 'root' })
export class MessageService {
    snackBar = inject(MatSnackBar);

    durationInSeconds = 5;

    showMessage(options: MessageOptions) {
        const { component, style } = snackBars[options.type];
        this.snackBar.openFromComponent(component, {
            duration: this.durationInSeconds * 1000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
            data: { message: options.message },
            panelClass: [style]
        });
    }
}
