import { EventEmitter, Injectable } from "@angular/core";
import { Service } from "../../core/services/service";
import { Observable, tap } from "rxjs";
import { Restaurant } from "../entities/restaurant";

@Injectable({ providedIn: 'root' })
export class RestaurantService extends Service<Restaurant> {
    updatedData = new EventEmitter();

    public constructor() {
        super();
        this.modulePath = 'restaurant';
    }
    
    public override create(data: Restaurant): Observable<Restaurant> {
        return super.create(data).pipe(
            tap(() => this.updatedData.emit())
        );
    }

    public override update(id: number, data: Restaurant): Observable<Restaurant> {
        return super.update(id, data).pipe(
            tap(() => this.updatedData.emit())
        );
    }
}