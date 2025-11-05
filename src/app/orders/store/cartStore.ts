import { computed, effect, inject, Injectable, signal } from "@angular/core";
import { AuthUserStore } from "../../core/stores/auth_user.store";
import { MenuItem } from "../../restaurant/entities/menu_item";
import { Cart } from "../entities/cart";
import { OrderService } from "../services/order.service";

@Injectable({ providedIn: 'root' })
export class CartStore {
    service = inject(OrderService);
    authUserStore = inject(AuthUserStore);

    readonly cart = signal<Cart | null>(null);

    total = computed<number | undefined>(() => this.cart()?.items.reduce((sum, item) => sum + item.price, 0));

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

                const existing = result.items.find(item => item.id === newItem.id);
                if (existing) {
                    result.items = result.items.map(i => i.id === newItem.id ? { ...i, qty: i.qty + 1 } : i);
                } else {
                    result.items = [...result.items, { ...newItem, qty: 1 }];
                }
            }

            return result;
        });
    }

    removeFromCart(newItem: MenuItem) {
        this.cart.update((cart) => {
            let result = null;
            if (cart) {
                if (cart.restaurantId === newItem.restaurantId) {
                    result = { ...cart };

                    const item = result.items.find(item => item.id === newItem.id);

                    if (item) {
                        if (item.qty > 1) {
                            result.items = result.items.map(i => i.id === newItem.id ? { ...i, qty: i.qty - 1 } : i);
                        } else {
                            result.items = result.items.filter(i => i.id !== item.id);
                        }
                    }

                    if (result.items.length === 0) result = null;
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
            restaurantId: this.cart()?.restaurantId,
            orderItems: this.cart()?.items.map(item => ({
                qty: item.qty,
                unitPrice: item.price,
                menuItemId: item.id
            }))
        }).subscribe();
    }
}
