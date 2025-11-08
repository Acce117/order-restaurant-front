import { Component, inject, signal } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogConfig } from "@angular/material/dialog";
import { MatPaginatorModule } from "@angular/material/paginator";
import { RouterModule } from "@angular/router";
import { Subject, Subscription, takeUntil } from "rxjs";
import { BaseDashboardView } from "../../../core/components/base/dashboad-view.component";
import { Table } from "../../../core/components/table/table";
import { Restaurant } from "../../entities/restaurant";
import { RestaurantService } from "../../services/restaurant.service";
import { CreateRestaurantForm } from "../create-restaurant-form/createRestaurantForm";
import { UpdateRestaurantForm } from "../update-restaurant-form/updateRestaurantForm";

@Component({
    selector: 'restaurant-view',
    templateUrl: './restaurantView.html',
    styleUrl: './restaurantView.scss',
    imports: [
        Table,
        MatPaginatorModule,
        RouterModule,
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

    override getData(params: any): Subscription {
        return this.service.getAll(params)
            .subscribe((res) => {
                this.data.set(res.data);
                this.resultsLength.set(res.count);
            });
    }
}
