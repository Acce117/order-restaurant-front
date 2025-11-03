import { Routes } from "@angular/router";
import { RestaurantCatalogue } from "../views/restaurants/restaurantsCatalogue";
import { MenuCatalogue } from "../views/menu/menuCatalogue";

export const catalogueRoutes: Routes = [
    { path: '', redirectTo: 'restaurants', pathMatch: 'full'},
    {
        path: 'restaurants',
        component: RestaurantCatalogue
    },
    {
        path: 'menu/:id',
        component: MenuCatalogue
    }
]