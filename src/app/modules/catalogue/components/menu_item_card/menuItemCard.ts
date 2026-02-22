import { Component, inject, input } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { CurrencyPipe } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MenuItem } from "../../../restaurant/entities/menu_item";
import { CartStore } from "../../../orders/store/cartStore";
import { IsAuth } from "../../../../core/directives/isAuth";

@Component({
    selector: 'menu-item-card',
    templateUrl: './menuItemCard.html',
    imports: [
    MatCardModule,
    CurrencyPipe,
    MatButtonModule,
    IsAuth
]
})
export class MenuItemCard {
    item = input.required<MenuItem>();
    cartStore = inject(CartStore);
}