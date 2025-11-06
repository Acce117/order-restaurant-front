import { inject, Injectable, signal } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MessageService } from "../core/services/message.service";

export interface Notification { message: string }

@Injectable({ providedIn: 'root' })
export class NotificationsStore {
    notifications = signal<Notification[]>([]);
    messageService = inject(MessageService);

    pushNotification(notification: Notification) {
        console.log(notification);
        this.notifications.update((value) => {
            return [...value, notification];
        })

        this.messageService.showMessage(
            {
                message: notification.message,
                type: 'success'
            }
        );
    }
}
