import { Component, inject, input } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { CurrencyPipe } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { AppHasRoles } from "../../../auth/directives/isAuth";
import { MenuItem } from "../../../modules/restaurant/entities/menu_item";
import { CartStore } from "../../../modules/orders/store/cartStore";

@Component({
    selector: 'menu-item-card',
    templateUrl: './menuItemCard.html',
    imports: [
    MatCardModule,
    CurrencyPipe,
    MatButtonModule,
    AppHasRoles
]
})
export class MenuItemCard {
    item = input.required<MenuItem>();
    cartStore = inject(CartStore);
}