import { DialogRef } from "@angular/cdk/dialog";
import { DestroyRef, inject } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Subscription } from "rxjs";
import { IService } from "../../services/service";

export abstract class BaseForm {
    service!: IService;

    formGroup!: FormGroup;

    destroyRef: DestroyRef = inject(DestroyRef);

    handleSubmit() {
        const subscription = this.subscribeRequest();
        this.onDestroy(subscription);
    };
    
    abstract subscribeRequest(): Subscription;

    onDestroy(subscription: Subscription) {
        this.destroyRef.onDestroy(() => subscription.unsubscribe());
    }
}

export abstract class DialogBaseForm extends BaseForm{
    dialogRef: DialogRef = inject(DialogRef);
}
