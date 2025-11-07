import { HttpClient } from "@angular/common/http";
import { Component, inject, signal } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogModule } from "@angular/material/dialog";
import { environment } from "../../../environments/environment";
import { NotificationsService } from "../services/notifications.service";

@Component({
    selector: 'notification-view',
    templateUrl: './notificationDialog.html',
    styleUrl: './notificationDialog.scss',
    imports: [MatDialogModule],
})
export class NotificationDialog {
    data = inject(MAT_DIALOG_DATA);
    topic = signal<string>('');
    message = signal<string>('');
    notificationsService = inject(NotificationsService);

    ngOnInit() {
        this.topic.set(this.data.topic);
        this.message.set(this.data.message);

        this.notificationsService.updateNotificationStatus(this.data._id);
    }
}