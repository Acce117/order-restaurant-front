import { DialogRef } from "@angular/cdk/dialog";
import { Component, inject } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MAT_DIALOG_DATA, MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MenuItem } from "../../entities/menu_item";
import { MenuItemService } from "../../services/menu_item.service";
import { DialogBaseForm } from "../../../../core/components/base/form.component";

@Component({
    selector: 'create-menu-item-form',
    templateUrl: './createMenuItemForm.html',
    imports: [
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        ReactiveFormsModule,
        MatButtonModule,
    ]
})
export class CreateMenuItemForm extends DialogBaseForm {
    override service = inject(MenuItemService);
    restaurantId = inject(MAT_DIALOG_DATA);

    override formGroup = new FormGroup({
        name: new FormControl('', { validators: [Validators.required] }),
        price: new FormControl(0, { validators: [Validators.required, Validators.min(0)] }),
        stock: new FormControl(0, { validators: [Validators.required, Validators.min(0)] }),
        restaurantId: new FormControl(this.restaurantId),
        active: new FormControl(false),
    });

    subscribeRequest() {
        return this.service.create(this.formGroup.value as MenuItem)
            .subscribe(() => {
                this.dialogRef.close();
            })
    }
}