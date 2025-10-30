import { Component, DestroyRef, inject, signal } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { AuthService } from "../../services/auth-service";
import { RouterLink } from "@angular/router";

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
export class Login {
    private authService = inject(AuthService);
    private destroyRef = inject(DestroyRef);
    loading = signal<boolean>(false);

    credentials = new FormGroup({
        email: new FormControl('', { validators: [Validators.required, Validators.email] }),
        password: new FormControl('', { validators: [Validators.required] })
    });

    onSubmit() {
        this.loading.set(true);
        const subscription = this.authService.login(
            this.credentials.value as { email: string, password: string },
        ).subscribe({
            error: () => this.loading.set(false)
        });

        this.destroyRef.onDestroy(() => subscription.unsubscribe());
    }
}