import { Component, DestroyRef, inject, OnInit } from "@angular/core";
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LoginFacade } from "./login.facade";
import { CommonModule } from "@angular/common";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { combineLatest, distinctUntilChanged } from "rxjs";
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'linkwire-login',
    templateUrl: './login.component.html',
    imports: [
        CommonModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
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
    error$ = this.facade.error$;
    user$ = this.facade.user$;

    form: FormGroup = new FormGroup({
        username: new FormControl(''),
        password: new FormControl(''),
    });

    ngOnInit(): void {
        combineLatest([
            this.user$,
            this.loading$,
        ]).pipe(
            distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)),
            takeUntilDestroyed(this.destroyRef),
        ).subscribe(([user, loading]) => {
            if (user && !loading) {
                this.router.navigate(['/dashboard']);
            }
        });
    }

    onSubmit() {
        const { username, password } = this.form.value;
        this.login(username, password);
    }
    
    login(username: string, password: string) {
        this.facade.login(username, password);
    }
}