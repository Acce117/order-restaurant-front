import { MenuItem } from "../../restaurant/entities/menu_item";

export class Cart {
    items: (MenuItem & { amount: number })[] = [];

    constructor(readonly restaurantId: number) {}
}
