import { Component, input } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MenuItem } from "../../../restaurant/entities/menu_item";
import { CurrencyPipe } from "@angular/common";

@Component({
    selector: 'menu-item-card',
    templateUrl: './menuItemCard.html',
    imports: [
        MatCardModule,
        CurrencyPipe
    ]
})
export class MenuItemCard {
    item = input.required<MenuItem>();
}