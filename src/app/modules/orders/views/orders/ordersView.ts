import { Component, inject, signal } from "@angular/core";
import { MatPaginatorModule } from "@angular/material/paginator";
import { RouterModule } from "@angular/router";
import { Subject, Subscription, takeUntil } from "rxjs";
import { OrderService } from "../../services/order.service";
import { MatButtonModule } from "@angular/material/button";
import { CurrencyPipe, DatePipe } from "@angular/common";
import { MatFormFieldModule } from "@angular/material/form-field";
import { ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { Table } from "../../../../core/components/table/table";
import { BaseDashboardView } from "../../../../core/components/base/dashboad-view.component";
import { TableColumn } from "../../../../core/components/table/types";
import { SearchInput } from "../../../../core/components/search-input/search-input";

@Component({
    selector: 'orders',
    templateUrl: './ordersView.html',
    imports: [Table, RouterModule, MatPaginatorModule, MatButtonModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, SearchInput],
})
export class OrdersView extends BaseDashboardView {
    override service = inject(OrderService);

    private destroy = new Subject<void>();

    restaurantFilter = signal('');

    override tableColumns: TableColumn[] = [
        { name: 'Total', property: 'total', pipe: new CurrencyPipe('en-Us') },
        { name: 'Created at', property: 'createdAt', pipe: new DatePipe('en-Us') },
        { name: 'Restaurant', property: 'restaurant' },
        { name: 'Customer', property: 'customer' },
        { name: 'Status', property: 'status' },
    ]

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

    override setParams() {
        let params = super.setParams();

        params = {
            relations: ['customer', 'restaurant'],
            ...params,
        };

        if (this.restaurantFilter() !== '')
            params.where = {
                restaurant: {
                    name: this.restaurantFilter()
                }
            }

        return params;
    }

    override getData(params: any): Subscription {
        return this.service.getAll(params).subscribe((res) => {
            const data = res.data.map(e => (
                {
                    ...e,
                    customer: e.customer.username,
                    restaurant: e.restaurant.name
                }
            ));

            this.data.set(data);
            this.resultsLength.set(res.count);
        })
    }
}