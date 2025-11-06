import { Routes } from "@angular/router";
import { RestaurantView } from "../views/restaurant-view/restaurant-view.component";
import { RestaurantDetails } from "../views/restaurant-details/restaurant-details.component";
import { isAuthorizedGuard } from "../../auth/guards/is-authorized-guard";

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