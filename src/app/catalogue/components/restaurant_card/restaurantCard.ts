import { Component, input } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { Restaurant } from "../../../restaurant/entities/restaurant";

@Component({
    selector: 'restaurant-card',
    templateUrl: './restaurantCard.html',
    imports: [MatCardModule]
})
export class RestaurantCard {
    item = input.required<Restaurant>();
}