import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Notification } from "../entity/notification";

@Injectable({ providedIn: 'root' })
export class NotificationsService {
    client = inject(HttpClient);

    getAll() {
        return this.client.get<Notification[]>(`${environment.API_PATH}/site/me/notifications`);
    }

    updateNotificationStatus(id: string) {
        this.client.patch(`${environment.API_PATH}/notifications/${id}`, {})
            .subscribe();
    }
}