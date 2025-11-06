import { Component, inject } from "@angular/core";
import { MAT_SNACK_BAR_DATA } from "@angular/material/snack-bar";

@Component({
    selector: 'error-message',
    templateUrl: './message.html',
})
export class ErrorMessage {
    data = inject(MAT_SNACK_BAR_DATA);
}