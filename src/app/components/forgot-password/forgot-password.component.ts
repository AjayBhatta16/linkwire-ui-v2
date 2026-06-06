import { Component } from "@angular/core";
import { BehaviorSubject, combineLatest, distinctUntilChanged, map } from "rxjs";
import { detectJSONChanges } from "../../utils/pipe-utils";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";

@Component({
    selector: 'linkwire-forgot-password',
    templateUrl: './forgot-password.component.html',
    imports: [
        CommonModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
    ],
})
export class ForgotPasswordComponent {
    validationErrorSubject = new BehaviorSubject<string | null>(null);
    validationError$ = this.validationErrorSubject.asObservable();

    error$ = combineLatest([
        this.validationError$,
    ]).pipe(
        distinctUntilChanged(detectJSONChanges),
        map(([validationError]) => {
            return validationError;
        })
    );

    form: FormGroup = new FormGroup({
        email: new FormControl('', { validators: [Validators.required, Validators.email] }),
    });

    onSubmit() {
        if (this.form.get('email')?.invalid) {
            this.validationErrorSubject.next('Please enter a valid email address.');
            return;
        }

        this.validationErrorSubject.next(null);

        const { email } = this.form.value;

        this.requestPasswordReset(email);
    }

    requestPasswordReset(email: string) {
        
    }
}