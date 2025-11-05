import { Component, inject } from "@angular/core";
import { CartStore } from "../store/cartStore";
import { MatButtonModule } from "@angular/material/button";
import { OrderService } from "../services/order.service";
import { CartItemCard } from "../components/cartItemCard";

@Component({
    selector: 'cart',
    templateUrl: './cartView.html',
    styleUrl: './cartView.scss',
    imports: [MatButtonModule, CartItemCard],
})
export class CartView {
    cartStore = inject(CartStore);
    service = inject(OrderService);
}