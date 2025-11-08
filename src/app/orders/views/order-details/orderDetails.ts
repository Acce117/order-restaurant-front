import { CurrencyPipe, DatePipe } from "@angular/common";
import { Component, computed, DestroyRef, inject, resource, signal } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { firstValueFrom } from "rxjs";
import { Table } from "../../../core/components/table/table";
import { OrderService } from "../../services/order.service";
import { Order } from "../../entities/order";
import { TableColumn } from "../../../core/components/table/types";
import { MatButtonModule } from "@angular/material/button";

@Component({
    selector: 'order-details',
    templateUrl: './orderDetails.html',
    imports: [DatePipe, CurrencyPipe, Table, MatButtonModule]
})
export class OrderDetails {
    service = inject(OrderService);
    activatedRoute = inject(ActivatedRoute);

    tableColumns: TableColumn[] = [
        { name: 'Qty', property: 'qty' },
        { name: 'Unit price', property: 'unitPrice', pipe: new CurrencyPipe('en-Us') }
    ];

    orderId = signal<number>(0);

    destroyRef = inject(DestroyRef);

    orderResource = resource({
        loader: () => {
            this.activatedRoute.params.subscribe(params => {
                this.orderId.set(params['id']);
            })

            return firstValueFrom(this.service.getById(this.orderId(), {
                relations: ['customer', 'orderItems.menuItem', 'restaurant'],
            }));
        }
    })

    orderItems = computed(
        () => this.orderResource.hasValue() ? this.orderResource.value().orderItems : []
    );

    order = computed<Order | null>(() =>
        this.orderResource.hasValue() ? this.orderResource.value() : null
    );
    
    nextStatus = computed(() => {
        let nextStatus = 'confirmed';

        if(this.order()) {
            const status = this.order()!.status;

            if(status === 'confirmed') nextStatus = 'in_preparation';
            if(status === 'in_preparation') nextStatus = 'ready';
            if(status === 'ready') nextStatus = 'delivered';
        }

        return nextStatus;
    })

    changeOrderStatus() {
        const subscriber = this.service.changeOrderStatus(this.orderId(), this.nextStatus())
            .subscribe(() => this.orderResource.reload());

        this.destroyRef.onDestroy(() => subscriber.unsubscribe());
    }

    cancelOrder() {
        const subscriber = this.service.changeOrderStatus(this.orderId(), 'canceled')
            .subscribe(() => this.orderResource.reload());

        this.destroyRef.onDestroy(() => subscriber.unsubscribe());
    }
}