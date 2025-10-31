import { Component, DestroyRef, inject, signal } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { AuthService } from "../../services/auth-service";
import { Router, RouterLink } from "@angular/router";
import { SignInCredentials } from "../../entities/sign_in_credentials.entity";
import { AppStore } from "../../../core/stores/app.store";

@Component({
    selector: 'sign-in',
    templateUrl: './sing_in.template.html',
    styleUrl: '../../styles/auth.scss',
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        RouterLink
    ],
})
export class SignIn {
    private authService = inject(AuthService);
    private destroyRef = inject(DestroyRef);
    private router = inject(Router);
    private appStore = inject(AppStore);

    loading = signal<boolean>(false);

    credentials = new FormGroup({
        username: new FormControl<string>('', { validators: [Validators.required] }),
        email: new FormControl<string>('', { validators: [Validators.required, Validators.email] }),
        password: new FormControl<string>('', { validators: [Validators.required] })
    });

    onSubmit() {
        if (!this.credentials.errors) {
            const previousUrl = this.appStore.previousUrl || '';
            
            this.loading.set(true);

            const subscription = this.authService.signIn(
                this.credentials.value as SignInCredentials,
            ).subscribe({
                next: () => this.router.navigate([previousUrl]),
                error: () => this.loading.set(false)
            });

            this.destroyRef.onDestroy(() => subscription.unsubscribe());
        }
    }
}