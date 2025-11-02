import { Component, DestroyRef, inject, signal, ViewChild } from "@angular/core";
import { Table } from "../../../core/components/table/table";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { RouterModule } from "@angular/router";
import { SearchInput } from "../../../core/components/search-input/search-input";
import { Subject, takeUntil } from "rxjs";
import { RestaurantService } from "../../services/restaurant.service";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { CreateRestaurantForm } from "../create-restaurant-form/create-restaurant-form.component";
import { UpdateRestaurantForm } from "../update-restaurant-form/update-restaurant-form.component";
import { Restaurant } from "../../entities/restaurant";
import { DialogBaseForm } from "../../../core/components/base/form.component";
import { BaseDashboardView } from "../../../core/components/base/dashboad-view.component";

@Component({
    selector: 'restaurant-view',
    templateUrl: './restaurant-view.template.html',
    styleUrl: './restaurant-view.scss',
    imports: [
        Table,
        MatPaginatorModule,
        RouterModule,
        SearchInput,
        MatButtonModule
    ],
})
export class RestaurantView extends BaseDashboardView<Restaurant> {
    override service = inject(RestaurantService);

    override dialogs = {
        create: CreateRestaurantForm,
        update: UpdateRestaurantForm,
    };

    override tableColumns = [
        { name: 'Name', property: 'name' },
        { name: 'Address', property: 'address' },
        { name: 'Is active', property: 'active' },
    ]

    //TODO filter
    searchEntry = signal<string>('');

    override dialogOptions: MatDialogConfig = {
        width: '400px',
        height: '385px',
        enterAnimationDuration: '100ms',
        exitAnimationDuration: '100ms',
    }
    
    private destroy = new Subject<void>();

    constructor() {
        super();
        this.service.updatedData.pipe(
            takeUntil(this.destroy),
        ).subscribe(() => this.loadData());
    }

    ngOnDestroy() {
        this.destroy.next();
        this.destroy.complete();
    }

}
