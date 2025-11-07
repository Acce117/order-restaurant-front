import { Component, computed, inject } from "@angular/core";
import { MatMenuModule } from "@angular/material/menu";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatBadgeModule } from "@angular/material/badge";
import { NotificationsStore } from "./notificationsStore";
import { MatDialog } from "@angular/material/dialog";
import { NotificationDialog } from "./views/notificationDialog";
import { Notification } from "./entity/notification";

@Component({
    selector: 'notification',
    templateUrl: './notifications.html',
    styleUrl: './notifications.scss',
    imports: [MatMenuModule, MatButtonModule, MatIconModule, MatBadgeModule]
})
export class NotificationComponent {
    notificationsStore = inject(NotificationsStore);
    notifications = this.notificationsStore.notifications;
    notificationsCount = computed(() => this.notifications().length);
    dialog = inject(MatDialog);

    openNotificationDialog(notification: Notification) {
        this.dialog.open(NotificationDialog, {
            width: '400px',
            enterAnimationDuration: '100ms',
            exitAnimationDuration: '100ms',
            data: notification
        });
    }
}