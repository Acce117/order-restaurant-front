import { Component, inject } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatButtonModule } from "@angular/material/button";
import { RestaurantService } from "../../services/restaurant.service";
import { Restaurant } from "../../entities/restaurant";
import { DialogBaseForm } from "../../../core/components/base/form.component";

@Component({
    selector: 'restaurant-form',
    templateUrl: './create-restaurant-form.template.html',
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatDialogModule,
        MatCheckboxModule,
        MatButtonModule,
    ]
})
export class CreateRestaurantForm extends DialogBaseForm {
    override service = inject(RestaurantService);

    override formGroup = new FormGroup({
        name: new FormControl<string>('', { validators: [Validators.required] }),
        address: new FormControl<string>(''),
        active: new FormControl<boolean>(false),
    });

    subscribeRequest() {
        return this.service.create(this.formGroup.value as Restaurant)
            .subscribe(() => {
                this.dialogRef.close();
            });
    }
}