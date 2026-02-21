import { Component, computed, inject, input } from "@angular/core";
import { CartItem } from "../entities/cart";
import { MatButtonModule } from "@angular/material/button";
import { CartStore } from "../store/cartStore";
import { CurrencyPipe } from "@angular/common";

@Component({
    selector: 'cart-item',
    templateUrl: './cartItemCard.html',
    imports: [MatButtonModule, CurrencyPipe],
    host: {
        class: "flex flex-wrap bg-[var(--mat-sys-surface)] rounded-3xl py-3 px-10 shadow-sm gap-5"
    }
})
export class CartItemCard {
    cartStore = inject(CartStore);

    item = input.required<CartItem>();
    
    subTotal = computed(()=>{
        const item = this.item();
        return item.price * item.qty
    });

    addToCart() {
        this.cartStore.addToCart(this.item());
    }

    removeFromCart() {
        this.cartStore.removeFromCart(this.item());
    }
}