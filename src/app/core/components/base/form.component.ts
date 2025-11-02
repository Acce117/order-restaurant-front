import { FormGroup } from "@angular/forms";
import { IService, Service } from "../../services/service";
import { DialogRef } from "@angular/cdk/dialog";
import { DestroyRef, inject } from "@angular/core";
import { Subscription } from "rxjs";

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
