import { Injectable } from "@angular/core";
import { Service } from "../../core/services/service";
import { Subject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class OrderService extends Service {
    override modulePath: string = 'order';
    updatedData = new Subject();
}
