import { Injectable } from "@angular/core";
import { Service } from "../../core/services/service";
import { Subject } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable({ providedIn: 'root' })
export class OrderService extends Service {
    override modulePath: string = 'order';
    updatedData = new Subject();

    changeOrderStatus(id: number, status: string) {
        return this.http.patch(`${environment.API_PATH}/${this.modulePath}/change-status/${id}`, {
            status
        })
    }
}
