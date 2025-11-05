import { ComponentType } from "@angular/cdk/portal";
import { Component, DestroyRef, inject, signal, ViewChild } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { Subscription } from "rxjs";
import { IService, Service } from "../../services/service";
import { TableColumn } from "../table/types";
import { DialogBaseForm } from "./form.component";

@Component({
    template: ''
})
export abstract class BaseDashboardView<T = any> {
    dialogRef = inject(MatDialog);
    data = signal<T[]>([]);

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    service!: IService;

    destroyRef = inject(DestroyRef);

    dialogs: { [key: string]: ComponentType<DialogBaseForm> } = {};

    tableColumns!: TableColumn[];

    resultsLength = signal(0);

    dialogOptions: MatDialogConfig = {};
    
    ngAfterViewInit() { this.loadData(); }

    loadData() {
        const params = this.setParams();

        const subscriber = this.getData(params);
        this.onDestroy(subscriber);
    }


    abstract getData(params: any): Subscription;

    setParams() {
        const params: { where?: any, limit?: number, offset?: number, orderedBy: string[]} = {
            limit: this.paginator.pageSize,
            offset: this.paginator.pageIndex * this.paginator.pageSize,
            orderedBy: ['id']
        }

        return params;
    }

    onDestroy(subscriber: Subscription) {
        this.destroyRef.onDestroy(() => subscriber.unsubscribe());
    }

    openDialog(scenario: string, data?: T) {
        if(data) this.dialogOptions.data = data;
        
        const dialog = this.dialogs[scenario];

        this.dialogRef.open<DialogBaseForm>(dialog, this.dialogOptions);
    }
}