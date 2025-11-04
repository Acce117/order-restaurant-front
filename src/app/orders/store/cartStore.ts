import { computed, effect, Injectable, signal } from "@angular/core";
import { Cart } from "../entities/cart";
import { MenuItem } from "../../restaurant/entities/menu_item";

@Injectable({ providedIn: 'root' })
export class CartStore {
    readonly cart = signal<Cart | null>(null);

    total = computed(() => this.cart()?.items.reduce((sum, item) => sum + item.price, 0));

    constructor() {
        const cart = localStorage.getItem('cart');

        if (cart) this.cart.set(JSON.parse(cart));

        effect(() => {
            const cart = this.cart();

            localStorage.setItem('cart', JSON.stringify(cart));
        })
    }


    addToCart(newItem: MenuItem) {
        this.cart.update((cart) => {
            let result = null;
            
            if (cart && cart.restaurantId !== newItem.restaurantId) 
                result = cart;
            else {
                result = cart ? { ...cart } : new Cart(newItem.restaurantId);
                
                const item = result.items.find(item => item.id === newItem.id);
                item ? item.amount++ : result.items.push({ ...newItem, amount: 1 })
            }

            return result;
        });
    }
}
