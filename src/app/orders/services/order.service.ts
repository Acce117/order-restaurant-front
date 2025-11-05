import { Injectable } from "@angular/core";
import { Service } from "../../core/services/service";

@Injectable({ providedIn: 'root' })
export class OrderService extends Service {
    override modulePath: string = 'order';
}
