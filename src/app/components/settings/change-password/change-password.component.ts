import { Component, inject } from "@angular/core";
import { ChangePasswordFacade } from "./change-password.facade";
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from "@angular/common";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { toSignal } from "@angular/core/rxjs-interop";
import { BehaviorSubject, combineLatest, distinctUntilChanged, map } from "rxjs";
import { SuccessStatusJumbotronComponent } from "../../shared/status-messages/success-status-jumbotron/success-status-jumbotron.component";
import { Router } from "@angular/router";
import { detectJSONChanges } from "../../../utils/pipe-utils";


@Component({
    selector: 'linkwire-change-password',
    templateUrl: './change-password.component.html',
    providers: [
        ChangePasswordFacade,
    ],
    imports: [
        CommonModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        SuccessStatusJumbotronComponent,
    ],
})
export class ChangePasswordComponent {
    facade = inject(ChangePasswordFacade);
    router = inject(Router);

    facadeError$ = this.facade.error$;

    success = toSignal(this.facade.success$);
    user = toSignal(this.facade.user$);

    validationErrorSubject = new BehaviorSubject<string | null>(null);
    validationError$ = this.validationErrorSubject.asObservable();

    displayError$ = combineLatest([
        this.facadeError$,
        this.validationError$,
    ]).pipe(
        distinctUntilChanged(detectJSONChanges),
        map(([facadeError, validationError]) => facadeError ?? validationError)
    );

    displayError = toSignal(this.displayError$);

    form: FormGroup = new FormGroup({
        oldPassword: new FormControl('', { validators: [Validators.required] }),
        newPassword: new FormControl('', { validators: [Validators.required] }),
        confirmPassword: new FormControl('', { validators: [Validators.required] }),
    });

    onSubmit() {
        if (this.form.get('oldPassword')?.invalid) {
            this.validationErrorSubject.next('Current password is required.');
            return;
        }

        if (this.form.get('newPassword')?.invalid) {
            this.validationErrorSubject.next('New password is required.');
            return;
        }

        if (this.form.get('confirmPassword')?.value != this.form.get('newPassword')?.value) {
            this.validationErrorSubject.next('Passwords do not match.');
            return;
        }

        this.validationErrorSubject.next(null);

        const { oldPassword, newPassword } = this.form.value;

        this.updateUserPassword(oldPassword, newPassword);
    }

    updateUserPassword(oldPassword: string, newPassword: string) {
        this.facade.updateUserPassword(
            this.user()!.username, 
            oldPassword,
            newPassword,
        );
    }

    navigateToDashboard() {
        this.router.navigate(['/dashboard']);
    }
}