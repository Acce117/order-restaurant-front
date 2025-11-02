import { Component, DestroyRef, inject, signal } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { Router, RouterLink } from "@angular/router";
import { BaseForm } from "../../../core/components/base/form.component";
import { AppStore } from "../../../core/stores/app.store";
import { AuthCredentials } from "../../entities/auth_credentials.entity";
import { AuthService } from "../../services/auth-service";

@Component({
    selector: 'login',
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        RouterLink
    ],
    templateUrl: './login.html',
    styleUrl: '../../styles/auth.scss',
})
export class Login extends BaseForm {
    override service = inject(AuthService);

    private router = inject(Router);
    private appStore = inject(AppStore);

    loading = signal<boolean>(false);

    override formGroup = new FormGroup({
        email: new FormControl<string>('', { validators: [Validators.required, Validators.email] }),
        password: new FormControl<string>('', { validators: [Validators.required] })
    });

    subscribeRequest() {
        const previousUrl = this.appStore.previousUrl || '';
        this.appStore.previousUrl = null;

        this.loading.set(true);

        return this.service.login(
            this.formGroup.value as AuthCredentials
        ).subscribe({
            next: () => this.router.navigate([previousUrl]),
            error: () => this.loading.set(false),
        });
    }
}