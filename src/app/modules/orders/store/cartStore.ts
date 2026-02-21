import { computed, effect, inject, Injectable, signal } from "@angular/core";
import { MenuItem } from "../../restaurant/entities/menu_item";
import { Cart, CartItem } from "../entities/cart";
import { OrderService } from "../services/order.service";
import { AuthUserStore } from "../../../core/stores/auth_user.store";

@Injectable({ providedIn: 'root' })
export class CartStore {
    service = inject(OrderService);
    authUserStore = inject(AuthUserStore);

    readonly cart = signal<Cart>(new Cart());

    total = computed<number | undefined>(() => this.cart().totalValue());

    constructor() {
        const cartJSON = localStorage.getItem('cart');
        const cart = new Cart()
        if (cartJSON) {
            const cartData = JSON.parse(cartJSON);
            cart.items = cartData.items;
            this.cart.set(cart);
        }
        

        effect(() => {
            const cart = this.cart();

            localStorage.setItem('cart', JSON.stringify(cart));
        })
    }


    addToCart(newItem: MenuItem) {
        this.cart.update((cart) => {
            let result = null;
            
            result = new Cart();
            result.items = cart ? cart.items : [];
            result.addItem(newItem);

            return result;
        });
    }

    removeFromCart(item: MenuItem) {
        this.cart.update((cart) => {
            let result = null;
            
            result = new Cart();
            result.items = cart.items;
            result.removeItem(item);
            
            return result;
        })
    }

    createOrder() {
        this.service.create({
            total: this.total(),
            customerId: this.authUserStore.user.id,
            restaurantId: null,//this.cart()?.restaurantId,
            orderItems: this.cart()?.items.map(item => ({
                qty: item.qty,
                unitPrice: item.price,
                menuItemId: item.id
            }))
        }).subscribe(() => {
            this.cart()
        });
    }
}
