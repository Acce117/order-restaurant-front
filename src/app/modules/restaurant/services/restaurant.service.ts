import { EventEmitter, Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { Restaurant } from "../entities/restaurant";
import { Service } from "../../../core/services/service";
import { environment } from "../../../../environments/environment";

@Injectable({ providedIn: 'root' })
export class RestaurantService extends Service<Restaurant> {
    updatedData = new EventEmitter();

    public constructor() {
        super();
        this.modulePath = 'restaurant';
    }

    public override create(data: Restaurant): Observable<Restaurant> {
        return super.create(data)
            .pipe(tap(() => this.updatedData.emit()));
    }

    public override update(id: number, data: Restaurant): Observable<Restaurant> {
        return super.update(id, data)
            .pipe(tap(() => this.updatedData.emit()));
    }

    public changeActiveStatus(id: number) {
        return this.http.patch<Restaurant>(`${environment.API_PATH}/${this.modulePath}/change-active-status/${id}`, {})
            .subscribe(() => this.updatedData.emit());
    }
}