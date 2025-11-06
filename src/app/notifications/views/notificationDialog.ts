import { HttpClient } from "@angular/common/http";
import { Component, inject, signal } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogModule } from "@angular/material/dialog";
import { environment } from "../../../environments/environment";

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

    http = inject(HttpClient);


    ngOnInit() {
        this.topic.set(this.data.topic);
        this.message.set(this.data.message);

        // this.http.patch(`${environment.API_PATH}/notifications/${this.data._id}`, {})
        //     .subscribe({
        //         error: (err) => {
        //             if (err.status === 403) this.notificationsService.notifyError('Unauthorized');
        //             else if (err.status === 500) this.notificationsService.notifyError('Server is not available right now');
        //             else console.log(err);
        //         }
        //     });
    }
}