import { EventEmitter, Injectable } from "@angular/core";
import { Service } from "../../core/services/service";
import { Observable, tap } from "rxjs";

@Injectable({ providedIn: 'root' })
export class RestaurantService extends Service {
    updatedData = new EventEmitter();

    public constructor() {
        super();
        this.modulePath = 'restaurant';
    }
    
    public override create(data: any): Observable<any> {
        return super.create(data).pipe(
            tap(() => this.updatedData.emit())
        );
    }

    public override update(id: string, data: any): Observable<any> {
        return super.update(id, data).pipe(
            tap(() => this.updatedData.emit())
        );
    }
}