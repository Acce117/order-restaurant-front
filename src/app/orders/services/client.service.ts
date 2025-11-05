import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import qs from "qs";
import { Subject } from "rxjs";
import { environment } from "../../../environments/environment";
import { GetAllData, IService } from "../../core/services/service";

@Injectable({ providedIn: 'root' })
export class ClientService implements IService {
    http: HttpClient = inject(HttpClient);
    modulePath: string = 'client';
    updatedData = new Subject();

    getMyOrders(params: any) {
        const p = new HttpParams({ fromString: qs.stringify(params) });

        return this.http.get<GetAllData>(`${environment.API_PATH}/${this.modulePath}/orders`, { params: p })
    }
}