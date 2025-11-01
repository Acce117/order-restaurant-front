import { Component, inject } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatButtonModule } from "@angular/material/button";
import { RestaurantService } from "../../services/restaurant.service";

@Component({
    selector: 'restaurant-form',
    templateUrl: './restaurant-form.template.html',
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatDialogModule,
        MatCheckboxModule,
        MatButtonModule
    ]
})
export class RestaurantForm {
    dialogRef = inject(MatDialogRef);
    restaurantService = inject(RestaurantService);

    restaurant = new FormGroup({
        name: new FormControl<string>('', { validators: [Validators.required] }),
        address: new FormControl<string>(''),
        active: new FormControl<boolean>(false),
    });

    handleSubmit() {
        this.restaurantService.create(this.restaurant.value)
            .subscribe(() => {
                this.dialogRef.close();
            });
    }
}