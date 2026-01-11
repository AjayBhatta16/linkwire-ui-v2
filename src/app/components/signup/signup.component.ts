import { CommonModule } from "@angular/common";
import { Component, DestroyRef, inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { Router, RouterModule } from "@angular/router";
import { SignupFacade } from "./signup.facade";
import { BehaviorSubject, combineLatest, distinctUntilChanged, map } from "rxjs";
import { detectJSONChanges } from "../../utils/pipe-utils";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
    selector: 'linkwire-signup',
    templateUrl: './signup.component.html',
    imports: [
        CommonModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        RouterModule,
    ],
    providers: [
        SignupFacade,
    ],
})
export class SignupComponent implements OnInit {
    private destroyRef = inject(DestroyRef);
    private facade = inject(SignupFacade);
    private router = inject(Router);

    loading$ = this.facade.loading$
    user$ = this.facade.user$;

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
        username: new FormControl('', { validators: [Validators.required] }),
        email: new FormControl('', { validators: [Validators.required, Validators.email] }),
        password: new FormControl('', { validators: [Validators.required] }),
    });

    ngOnInit(): void {
        combineLatest([
            this.user$,
            this.loading$,
        ]).pipe(
            distinctUntilChanged(detectJSONChanges),
            takeUntilDestroyed(this.destroyRef),
        ).subscribe(([user, loading]) => {
            if (user && !loading) {
                this.router.navigate(['/dashboard']);
            }
        });
    }

    onSubmit() {
        if (this.form.get('username')?.invalid) {
            this.validationErrorSubject.next('Username is required.');
            return;
        }

        if (this.form.get('email')?.invalid) {
            this.validationErrorSubject.next('A valid E-Mail is required.');
            return;
        }

        if (this.form.get('password')?.invalid) {
            this.validationErrorSubject.next('Password is required.');
            return;
        }

        this.validationErrorSubject.next(null);

        const { username, email, password } = this.form.value;

        this.signup(username, password, email);
    }

    signup(username: string, password: string, email: string) {
        this.facade.signup(username, password, email);
    }
}