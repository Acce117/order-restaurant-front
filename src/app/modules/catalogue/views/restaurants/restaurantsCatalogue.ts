import { Component, inject, signal } from "@angular/core";
import { RouterLink } from "@angular/router";
import { RestaurantCard } from "../../components/restaurant_card/restaurantCard";
import { CatalogueService } from "../../services/catalogue.service";
import { Restaurant } from "../../../restaurant/entities/restaurant";

@Component({
    selector: 'restaurant-catalogue',
    templateUrl: './restaurantsCatalogue.html',
    styleUrl: '../catalogue.scss',
    imports: [RestaurantCard, RouterLink]
})
export class RestaurantCatalogue {
    items = signal<Restaurant[]>([]);
    service = inject(CatalogueService);

    ngOnInit() {
        this.service.restaurantsCatalogue()
            .subscribe((res)=>this.items.set(res));
    }
}
