import { MenuItem } from "../../restaurant/entities/menu_item";

export type CartItem = MenuItem & { qty: number };
export class Cart {
    items: CartItem[] = [];

    constructor(readonly restaurantId: number) {}
}
