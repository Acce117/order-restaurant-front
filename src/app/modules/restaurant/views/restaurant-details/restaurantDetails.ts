import { Component, computed, inject, resource, signal } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDivider } from "@angular/material/divider";
import { MatPaginatorModule } from "@angular/material/paginator";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { firstValueFrom } from "rxjs";
import { Restaurant } from "../../entities/restaurant";
import { RestaurantService } from "../../services/restaurant.service";
import { MenuComponent } from "../menu/menu";

@Component({
    selector: 'restaurant-details',
    templateUrl: './restaurantDetails.html',
    imports: [
        RouterModule,
        MatPaginatorModule,
        MatButtonModule,
        MatDivider,
        MenuComponent
    ],
    host: {
        class: 'flex justify-between flex-wrap gap-10'
    }
})
export class RestaurantDetails {
    restaurantService = inject(RestaurantService);
    activatedRoute = inject(ActivatedRoute);

    restaurantId = signal<number>(0);

    restaurantResource = resource({
        loader: () => {
            this.activatedRoute.params.subscribe((params) => {
                this.restaurantId.set(parseInt(params['id']));
            })

            return firstValueFrom(this.restaurantService.getById(this.restaurantId()));
        }
    })

    restaurant = computed(() => {
        let restaurant: Restaurant = { name: '', address: '', active: false };;

        if (this.restaurantResource.hasValue()) restaurant = this.restaurantResource.value();

        return restaurant;
    })
}