import { Routes } from "@angular/router";
import { RestaurantView } from "../views/restaurant-view/restaurant-view.component";
import { RestaurantDetails } from "../views/restaurant-details/restaurant-details.component";

export const restaurantRoutes: Routes = [
    {
        path: 'restaurant',
        component: RestaurantView
    },
    {
        path: 'restaurant/:id',
        component: RestaurantDetails,
    }
];