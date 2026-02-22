import { MenuItem } from "../../restaurant/entities/menu_item";

export type CartItem = MenuItem & { qty: number };
export class Cart {
    items: CartItem[] = [];

    constructor(readonly restaurantId: number) { }

    totalValue() {
        return this.items.reduce((sum, item) => sum + item.price * item.qty, 0);
    }

    addItem(newItem: MenuItem) {
        const existing = this.items.find(item => item.id === newItem.id);
        if (existing) {
            this.items = this.items.map(i => i.id === newItem.id ? { ...i, qty: i.qty + 1 } : i);
        } else {
            this.items = [...this.items, { ...newItem, qty: 1 }];
        }
    }

    removeItem(item: MenuItem) {
        const existingItem = this.items.find(item => item.id === item.id);

        if (existingItem) {
            if (existingItem.qty > 1) {
                this.items = this.items.map(i => i.id === item.id ? { ...i, qty: i.qty - 1 } : i);
            } else {
                this.items = this.items.filter(i => i.id !== item.id);
            }
        }
    }
}
