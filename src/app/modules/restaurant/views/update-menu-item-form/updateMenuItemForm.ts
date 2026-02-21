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
    selector: 'update-menu-item-form',
    templateUrl: './updateMenuItemForm.html',
    imports: [
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        ReactiveFormsModule,
        MatButtonModule,
    ]
})
export class UpdateMenuItemForm extends DialogBaseForm {
    override service = inject(MenuItemService);
    data = inject<MenuItem>(MAT_DIALOG_DATA);

    override formGroup = new FormGroup({
        name: new FormControl(this.data.name, { validators: [Validators.required] }),
        price: new FormControl(this.data.price, { validators: [Validators.required, Validators.min(0)] }),
        stock: new FormControl(this.data.stock, { validators: [Validators.required, Validators.min(0)] }),
        restaurantId: new FormControl(this.data.restaurantId),
        active: new FormControl(this.data.active),
    });

    subscribeRequest() {
        return this.service.update(this.data.id!, this.formGroup.value as MenuItem)
            .subscribe(() => {
                this.dialogRef.close();
            })
    }
}