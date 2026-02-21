import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { IService } from "../../core/services/service";
import { environment } from "../../../environments/environment";
import { MenuItem } from "../../modules/restaurant/entities/menu_item";
import { Restaurant } from "../../modules/restaurant/entities/restaurant";

@Injectable({providedIn: 'root'})
export class CatalogueService implements IService{
    http = inject(HttpClient);
    modulePath: string = 'restaurant';

    public menuCatalogue(restaurantId: number) {
        return this.http.get<MenuItem[]>(`${environment.API_PATH}/${this.modulePath}/catalogue/menu/${restaurantId}`);
    }

    public restaurantsCatalogue() {
        return this.http.get<Restaurant[]>(`${environment.API_PATH}/${this.modulePath}/catalogue/restaurants`);
    }
}