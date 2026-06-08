import { Component, inject } from "@angular/core";
import { BehaviorSubject, combineLatest, distinctUntilChanged, map } from "rxjs";
import { detectJSONChanges } from "../../utils/pipe-utils";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ForgotPasswordFacade } from "./forgot-password.facade";
import { toSignal } from "@angular/core/rxjs-interop";

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
    providers: [ForgotPasswordFacade],
})
export class ForgotPasswordComponent {
    private facade = inject(ForgotPasswordFacade);

    loading$ = this.facade.loading$;
    
    success = toSignal(this.facade.success$);
        
    validationErrorSubject = new BehaviorSubject<string | null>(null);
    validationError$ = this.validationErrorSubject.asObservable();

    error$ = combineLatest([
        this.facade.error$,
        this.validationError$,
    ]).pipe(
        distinctUntilChanged(detectJSONChanges),
        map(([facadeError, validationError]) => {
            return validationError ?? facadeError;
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
        this.facade.requestPasswordReset(email);
    }
}