import { inject, Injectable } from "@angular/core";
import { io, Socket } from "socket.io-client";
import { NotificationsStore } from "../../../notifications/notificationsStore";
import { AuthUserStore } from "../../../core/stores/auth_user.store";
import { environment } from "../../../../environments/environment";

@Injectable({ providedIn: 'root' })
export class OrderSocket {
    notificationsStore = inject(NotificationsStore);
    authUserStore = inject(AuthUserStore);
    private socket: Socket;

    constructor(){
        this.socket = io(`${environment.API_PATH}`, {
            auth: { userId: this.authUserStore.user.id }
        });

        this.socket.on('order-status', (data: { message: string })=>{
            this.notificationsStore.pushNotification(data);
        })
    }
}
