import { Component, inject, input } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MenuItem } from "../../../restaurant/entities/menu_item";
import { CurrencyPipe } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { CartStore } from "../../../orders/store/cartStore";
import { AppHasRoles } from "../../../auth/directives/isAuth";

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