import { computed, effect, inject, Injectable, signal } from "@angular/core";
import { MenuItem } from "../../restaurant/entities/menu_item";
import { Cart } from "../entities/cart";
import { OrderService } from "../services/order.service";
import { AuthUserStore } from "../../../core/stores/auth_user.store";

@Injectable({ providedIn: 'root' })
export class CartStore {
    service = inject(OrderService);
    authUserStore = inject(AuthUserStore);

    readonly cart = signal<Cart | null>(null);

    total = computed<number | undefined>(() => this.cart() ? this.cart()!.totalValue() : 0);

    constructor() {
        const cartJSON = localStorage.getItem('cart');
        if (cartJSON) {
            const cartData = JSON.parse(cartJSON);
            const cart = new Cart(cartData.restaurantId);
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

            if (cart && cart.restaurantId !== newItem.restaurantId)
                result = cart;
            else {
                result = new Cart(newItem.restaurantId);
                result.items = cart ? cart.items : [];
                result.addItem(newItem);
            }

            return result;
        });
    }

    removeFromCart(item: MenuItem) {
        this.cart.update((cart) => {
            let result = null;
            
            if (cart) {
                if (cart.restaurantId === item.restaurantId) {
                    result = new Cart(cart.restaurantId);
                    result.items = cart.items;
                    result.removeItem(item);
                }
                else result = cart;
            }

            return result;
        })
    }

    createOrder() {
        this.service.create({
            total: this.total(),
            customerId: this.authUserStore.user.id,
            restaurantId: this.cart()!.restaurantId,
            orderItems: this.cart()?.items.map(item => ({
                qty: item.qty,
                unitPrice: item.price,
                menuItemId: item.id
            }))
        }).subscribe(() => {
            this.cart.set(null);
        });
    }

    arePendingItems(): boolean {
        return !this.cart() || this.cart()?.items.length == 0;
    }
}
