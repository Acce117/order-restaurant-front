import { Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { CartItemCard } from "../../components/cartItemCard";
import { OrderService } from "../../services/order.service";
import { CartStore } from "../../store/cartStore";

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