import { Component, inject, signal } from "@angular/core";
import { MatPaginatorModule } from "@angular/material/paginator";
import { RouterModule } from "@angular/router";
import { Subject, Subscription, takeUntil } from "rxjs";
import { BaseDashboardView } from "../../../core/components/base/dashboad-view.component";
import { SearchInput } from "../../../core/components/search-input/search-input";
import { Table } from "../../../core/components/table/table";
import { TableColumn } from "../../../core/components/table/types";
import { OrderService } from "../../services/order.service";
import { MatButtonModule } from "@angular/material/button";
import { DatePipe, formatDate } from "@angular/common";

@Component({
    selector: 'orders',
    templateUrl: './ordersView.html',
    imports: [SearchInput, Table, RouterModule, MatPaginatorModule, MatButtonModule],
})
export class OrdersView extends BaseDashboardView {
    override service = inject(OrderService);

    private destroy = new Subject<void>();

    override tableColumns: TableColumn[] = [
        { name: 'Total', property: 'total' },
        { name: 'Created at', property: 'createdAt', pipe: new DatePipe('en-Us') },
        { name: 'Restaurant', property: 'restaurant' },
        { name: 'Customer', property: 'customer' },
        { name: 'Status', property: 'status' },
    ]

    searchEntry = signal('');

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
        const params = super.setParams();

        return {
            relations: ['customer', 'restaurant'],
            ...params,
        };
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