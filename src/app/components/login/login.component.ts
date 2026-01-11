import { Component, DestroyRef, inject, OnInit } from "@angular/core";
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LoginFacade } from "./login.facade";
import { CommonModule } from "@angular/common";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router, RouterModule } from "@angular/router";
import { BehaviorSubject, combineLatest, distinctUntilChanged, map } from "rxjs";
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { detectJSONChanges } from "../../utils/pipe-utils";

@Component({
    selector: 'linkwire-login',
    templateUrl: './login.component.html',
    imports: [
        CommonModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        RouterModule,
    ],
    providers: [
        LoginFacade,
    ],
})
export class LoginComponent implements OnInit {
    private destroyRef = inject(DestroyRef);
    private facade = inject(LoginFacade);
    private router = inject(Router);

    loading$ = this.facade.loading$;
    user$ = this.facade.user$;

    validationErrorSubject = new BehaviorSubject<string | null>(null);
    validationError$ = this.validationErrorSubject.asObservable();

    error$ = combineLatest([
        this.facade.error$, 
        this.validationError$
    ]).pipe(
        distinctUntilChanged(detectJSONChanges),
        map(([facadeError, validationError]) => {
            return validationError ?? facadeError;
        })
    );

    form: FormGroup = new FormGroup({
        username: new FormControl('', { validators: [Validators.required] }),
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
            this.validationErrorSubject.next('Username/E-Mail is required.');
            return;
        }

        if (this.form.get('password')?.invalid) {
            this.validationErrorSubject.next('Password is required.');
            return;
        }

        this.validationErrorSubject.next(null);

        const { username, password } = this.form.value;

        this.login(username, password);
    }
    
    login(username: string, password: string) {
        this.facade.login(username, password);
    }
}