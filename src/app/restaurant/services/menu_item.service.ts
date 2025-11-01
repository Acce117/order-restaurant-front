import { EventEmitter, Injectable } from "@angular/core";
import { Service } from "../../core/services/service";
import { Observable, tap } from "rxjs";
import { MenuItem } from "../entities/menu_item";

@Injectable({ providedIn: 'root'})
export class MenuItemService extends Service<MenuItem> {
    updatedData = new EventEmitter();

    public constructor() {
        super();
        this.modulePath = 'restaurant/menu-item';
    }
    
    public override create(data: MenuItem): Observable<MenuItem> {
        return super.create(data).pipe(
            tap(() => this.updatedData.emit())
        );
    }

    public override update(id: number, data: MenuItem): Observable<MenuItem> {
        return super.update(id, data).pipe(
            tap(() => this.updatedData.emit())
        );
    }
}