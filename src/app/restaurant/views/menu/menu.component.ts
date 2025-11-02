import { Component, DestroyRef, inject, input, signal, ViewChild } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { RouterModule } from "@angular/router";
import { SearchInput } from "../../../core/components/search-input/search-input";
import { Table } from "../../../core/components/table/table";
import { MenuItemService } from "../../services/menu_item.service";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { Subject, takeUntil } from "rxjs";
import { CreateMenuItemForm } from "../create-menu-item-form";
import { UpdateMenuItemForm } from "../update-menu-item-form/update-menu-item-form.component";

@Component({
    selector: 'menu',
    templateUrl: './menu.template.html',
    imports: [
        SearchInput,
        Table,
        RouterModule,
        MatPaginatorModule,
        MatButtonModule,
    ],
})
export class MenuComponent {
    dialog = inject(MatDialog);
    data = signal<any>([]);
    restaurantId = input.required<number>()

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    menuItemService = inject(MenuItemService);

    destroyRef = inject(DestroyRef);

    tableColumns = [
        { name: 'Name', property: 'name' },
        { name: 'Price', property: 'price' },
        { name: 'Stock', property: 'stock' },
        { name: 'Is active', property: 'active' },
    ];
    
    searchEntry = signal('');
    
    resultsLength = signal(0);

    private destroy = new Subject();

    constructor() {
        this.menuItemService.updatedData.pipe(
            takeUntil(this.destroy),
        ).subscribe(() => this.loadData());
    }

    ngAfterViewInit() { this.loadData(); }
    
    loadData() {
        const params: { where?: any, limit?: number, offset?: number } = {
            limit: this.paginator.pageSize,
            offset: this.paginator.pageIndex * this.paginator.pageSize,
            where: {
                restaurantId: this.restaurantId()
            }
        }

        // if (this.searchEntry() !== '') {
        //     params.where = this.searchEntry();
        // }

        const subscriber = this.menuItemService.getAll(params)
            .subscribe((res) => {
                this.data.set(res.data);
                this.resultsLength.set(res.count);
            });

        this.destroyRef.onDestroy(() => subscriber.unsubscribe());
    }
    
    openCreateDialog() {
        const dialogOptions: MatDialogConfig = {
            width: '400px',
            height: '485px',
            enterAnimationDuration: '100ms',
            exitAnimationDuration: '100ms',
            data: this.restaurantId()
        }

        this.dialog.open(CreateMenuItemForm, dialogOptions);
    }

    openUpdateDialog(data: any) {
        const dialogOptions: MatDialogConfig = {
            width: '400px',
            height: '485px',
            enterAnimationDuration: '100ms',
            exitAnimationDuration: '100ms',
            data
        }

        this.dialog.open(UpdateMenuItemForm, dialogOptions);
    }
}
