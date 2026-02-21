import { Component, inject, input, signal } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogConfig } from "@angular/material/dialog";
import { MatPaginatorModule } from "@angular/material/paginator";
import { Subject, Subscription, takeUntil } from "rxjs";
import { MenuItem } from "../../entities/menu_item";
import { MenuItemService } from "../../services/menu_item.service";
import { CreateMenuItemForm } from "../create-menu-item-form/createMenuItemForm";
import { UpdateMenuItemForm } from "../update-menu-item-form/updateMenuItemForm";
import { Table } from "../../../../core/components/table/table";
import { BaseDashboardView } from "../../../../core/components/base/dashboad-view.component";

@Component({
    selector: 'menu',
    templateUrl: './menu.html',
    imports: [
        Table,
        MatPaginatorModule,
        MatButtonModule,
    ],
})
export class MenuComponent extends BaseDashboardView<MenuItem> {
    override service = inject(MenuItemService);

    restaurantId = input.required<number>()

    override dialogs = {
        update: UpdateMenuItemForm,
        create: CreateMenuItemForm,
    };

    override tableColumns = [
        { name: 'Name', property: 'name' },
        { name: 'Price', property: 'price' },
        { name: 'Stock', property: 'stock' },
        { name: 'Is active', property: 'active' },
    ];

    private destroy = new Subject();

    constructor() {
        super();
        this.service.updatedData.pipe(
            takeUntil(this.destroy),
        ).subscribe(() => this.loadData());
    }

    override setParams() {
        const params = super.setParams()

        return {
            ...params,
            where: {
                restaurantId: this.restaurantId(),
            }
        }
    }

    override dialogOptions: MatDialogConfig = {
        width: '400px',
        height: '485px',
        enterAnimationDuration: '100ms',
        exitAnimationDuration: '100ms',
        data: this.restaurantId,
    }

    override getData(params: any): Subscription {
        return this.service.getAll(params).subscribe((res) => {
            this.data.set(res.data)
        })
    }
}
