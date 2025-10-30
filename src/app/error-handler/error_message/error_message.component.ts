import { Component, inject, ViewEncapsulation } from "@angular/core";
import { MAT_SNACK_BAR_DATA } from "@angular/material/snack-bar";

@Component({
    selector: 'error-message',
    template: `
        <span>{{ data.message }}</span>
    `,
})
export class ErrorMessage {
    data = inject(MAT_SNACK_BAR_DATA);
}