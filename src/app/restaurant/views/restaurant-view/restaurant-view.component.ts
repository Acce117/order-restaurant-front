import { Component, DestroyRef, inject, signal, ViewChild } from "@angular/core";
import { Table } from "../../../core/components/table/table";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { RouterLink } from "@angular/router";
import { SearchInput } from "../../../core/components/search-input/search-input";
import { Subject, takeUntil } from "rxjs";
import { RestaurantService } from "../../services/restaurant.service";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { CreateRestaurantForm } from "../create-restaurant-form/create-restaurant-form.component";
import { UpdateRestaurantForm } from "../update-restaurant-form/update-restaurant-form.component";
import { Restaurant } from "../../entities/restaurant";

@Component({
    selector: 'restaurant-view',
    templateUrl: './restaurant-view.template.html',
    styleUrl: './restaurant-view.scss',
    imports: [Table, MatPaginatorModule, RouterLink, SearchInput, MatButtonModule],
})
export class RestaurantView {
    dialog = inject(MatDialog);
    data = signal<Restaurant[]>([]);

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    
    restaurantService = inject(RestaurantService);

    destroyRef = inject(DestroyRef);

    tableColumns = [
        { name: 'Name', property: 'name' },
        { name: 'Address', property: 'address' },
        { name: 'Is active', property: 'active' },
    ]

    searchEntry = signal<string>('');


    resultsLength = signal(0);

    private destroy = new Subject();

    constructor() {
        this.restaurantService.updatedData.pipe(
            takeUntil(this.destroy),
        ).subscribe(() => this.loadData());
    }

    ngAfterViewInit() { this.loadData(); }

    loadData() {
        const params: { where?: string, limit?: number, offset?: number } = {
            limit: this.paginator.pageSize,
            offset: this.paginator.pageIndex * this.paginator.pageSize
        }

        if (this.searchEntry() !== '') {
            params.where = this.searchEntry();
        }

        const subscriber = this.restaurantService.getAll(params)
            .subscribe((res) => {
                this.data.set(res.data);
                this.resultsLength.set(res.count);
            });

        this.destroyRef.onDestroy(() => subscriber.unsubscribe());
    }

    openCreateDialog() {
        const dialogOptions: MatDialogConfig = {
            width: '400px',
            height: '385px',
            enterAnimationDuration: '100ms',
            exitAnimationDuration: '100ms',
        }

        this.dialog.open(CreateRestaurantForm, dialogOptions);
    }

    openUpdateDialog(data: any) {
        const dialogOptions: MatDialogConfig = {
            width: '400px',
            height: '385px',
            enterAnimationDuration: '100ms',
            exitAnimationDuration: '100ms',
            data
        }

        this.dialog.open(UpdateRestaurantForm, dialogOptions);
    }
}
