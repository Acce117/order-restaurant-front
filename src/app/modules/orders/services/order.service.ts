import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Order } from "../entities/order";
import { Service } from "../../../core/services/service";
import { environment } from "../../../../environments/environment";

@Injectable({ providedIn: 'root' })
export class OrderService extends Service<Order> {
    override modulePath: string = 'order';
    updatedData = new Subject();

    changeOrderStatus(id: number, status: string) {
        return this.http.patch(`${environment.API_PATH}/${this.modulePath}/change-status/${id}`, {
            status
        })
    }
}
