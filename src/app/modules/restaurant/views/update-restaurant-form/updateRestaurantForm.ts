import { Component, inject } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { RestaurantService } from "../../services/restaurant.service";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { Restaurant } from "../../entities/restaurant";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatInputModule } from "@angular/material/input";
import { DialogBaseForm } from "../../../../core/components/base/form.component";

@Component({
    selector: 'update-restaurant-form',
    templateUrl: './updateRestaurantForm.html',
    imports: [
        MatDialogModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatCheckboxModule,
        MatInputModule,
    ]
})
export class UpdateRestaurantForm extends DialogBaseForm {
    override service = inject(RestaurantService);

    data = inject<Restaurant>(MAT_DIALOG_DATA)

    override formGroup = new FormGroup({
        name: new FormControl<string>(this.data.name, { validators: [Validators.required] }),
        address: new FormControl<string>(this.data.address || ''),
        active: new FormControl<boolean>(this.data.active),
    });

    subscribeRequest() {
        return this.service.update(this.data.id!, this.formGroup.value as Restaurant)
            .subscribe(() => {
                this.dialogRef.close();
            });
    }
}