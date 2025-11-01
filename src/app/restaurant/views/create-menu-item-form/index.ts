import { Component, inject } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MAT_DIALOG_DATA, MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MenuItemService } from "../../services/menu_item.service";
import { MatButtonModule } from "@angular/material/button";
import { MenuItem } from "../../entities/menu_item";
import { DialogRef } from "@angular/cdk/dialog";

@Component({
    selector: 'create-menu-item-form',
    templateUrl: './index.html',
    imports: [
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        ReactiveFormsModule,
        MatButtonModule,
    ]
})
export class CreateMenuItemForm {
    menuItemService = inject(MenuItemService);
    dialogRef = inject(DialogRef);
    restaurantId = inject(MAT_DIALOG_DATA);

    menuItem = new FormGroup({
        name: new FormControl('', { validators: [Validators.required] }),
        price: new FormControl(0, { validators: [Validators.required, Validators.min(0)] }),
        stock: new FormControl(0, { validators: [Validators.required, Validators.min(0)] }),
        restaurantId: new FormControl(this.restaurantId),
        active: new FormControl(false),
    });

    handleSubmit() {
        this.menuItemService.create(this.menuItem.value as MenuItem)
            .subscribe(() => {
                this.dialogRef.close();
            })
    }
}