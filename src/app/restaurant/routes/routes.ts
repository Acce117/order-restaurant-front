import { Routes } from "@angular/router";
import { RestaurantDetails } from "../views/restaurant-details/restaurantDetails";
import { RestaurantView } from "../views/restaurant-view/restaurantView";

export const restaurantRoutes: Routes = [
    {
        path: 'restaurant',
        component: RestaurantView,
        data: { roles: ['admin', 'operator'] }
    },
    {
        path: 'restaurant/:id',
        component: RestaurantDetails,
        data: { roles: ['admin', 'operator'] }
    }
];