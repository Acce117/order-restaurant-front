import { Component, inject, signal } from "@angular/core";
import { BaseDashboardView } from "../../../core/components/base/dashboad-view.component";
import { Table } from "../../../core/components/table/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { TableColumn } from "../../../core/components/table/types";
import { MatButtonModule } from "@angular/material/button";
import { Subject, Subscription, takeUntil } from "rxjs";
import { ClientService } from "../../servcices/client.service";

@Component({
    selector: 'my-orders',
    templateUrl: './myOrders.html',
    imports: [Table, MatPaginatorModule, MatButtonModule]
})
export class MyOrders extends BaseDashboardView {
    override service = inject(ClientService);
    searchEntry = signal('');
    
    override tableColumns: TableColumn[] = [
        { name: 'Total', property: 'total' },
        { name: 'Created at', property: 'createdAt' },
        { name: 'Restaurant', property: 'restaurantId' },
        { name: 'Status', property: 'status' },
    ]
    
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
        return this.service.getMyOrders(params).subscribe((res)=>{
            this.data.set(res.data);
            this.resultsLength.set(res.count);
        })
    }
}