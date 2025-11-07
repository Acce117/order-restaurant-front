import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { MessageService } from "../core/services/message.service";
import { NotificationsService } from "./services/notifications.service";
import { Notification } from "./entity/notification";

@Injectable({ providedIn: 'root' })
export class NotificationsStore {
    notifications = signal<Notification[]>([]);
    messageService = inject(MessageService);
    client = inject(HttpClient);
    notificationsService = inject(NotificationsService);

    loadNotifications() {
        this.notificationsService.getAll().subscribe(
            (res) => { this.notifications.set(res) }
        );
    }

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
