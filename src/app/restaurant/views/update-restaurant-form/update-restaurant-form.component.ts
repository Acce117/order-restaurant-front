import { Component, inject } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { RestaurantService } from "../../services/restaurant.service";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { Restaurant } from "../../entities/restaurant";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatInputModule } from "@angular/material/input";

@Component({
    selector: 'update-restaurant-form',
    templateUrl: './update-restaurant-form.template.html',
    imports: [
        MatDialogModule, 
        MatButtonModule, 
        ReactiveFormsModule, 
        MatFormFieldModule, 
        MatCheckboxModule,
        MatInputModule,
    ]
})
export class UpdateRestaurantForm {
    dialogRef = inject(MatDialogRef);
    restaurantService = inject(RestaurantService);

    data = inject<Restaurant>(MAT_DIALOG_DATA)

    restaurant = new FormGroup({
        name: new FormControl<string>(this.data.name, { validators: [Validators.required]}),
        address: new FormControl<string>(this.data.address || ''),
        active: new FormControl<boolean>(this.data.active),
    });

    handleSubmit() {
        this.restaurantService.update(this.data.id!,  this.restaurant.value)
            .subscribe(() => {
                this.dialogRef.close();
            });
    }
}