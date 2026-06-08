import { Component, computed, inject, OnInit } from "@angular/core";
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActivatedRoute } from "@angular/router";
import { PasswordResetsFacade } from "./password-resets.facade";
import { CommonModule } from "@angular/common";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { FailureStatusJumbotronComponent } from "../shared/status-messages/failure-status-jumbotron/failure-status-jumbotron.component";
import { toSignal } from "@angular/core/rxjs-interop";
import { BehaviorSubject } from "rxjs";

@Component({
    selector: "linkwire-password-resets",
    templateUrl: "./password-resets.component.html",
    imports: [
        CommonModule,
        FailureStatusJumbotronComponent,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
    ],
    providers: [PasswordResetsFacade],
})
export class PasswordResetsComponent implements OnInit {
    constructor(private route: ActivatedRoute) {}

    facade = inject(PasswordResetsFacade);

    requestId?: string;

    activeResetRequest = toSignal(this.facade.activeResetRequest$);
    error = toSignal(this.facade.error$);

    validationErrorSubject = new BehaviorSubject<string | null>(null);
    validationError$ = this.validationErrorSubject.asObservable();

    errorDetailMessage = computed(() => {
        const error = this.error();

        if (!error) {
            return '';
        }

        if (error === 'Expired') {
            return 'This password reset link has expired.\nPlease submit a new password reset request.';
        }

        if (error === 'Not Found') {
            return 'This password reset link is invalid.\nPlease submit a new password reset request.';
        }

        return 'An unexpected error occurred. Please try again later.';
    });

    form: FormGroup = new FormGroup({
        password: new FormControl('', { validators: [Validators.required] }),
        confirmPassword: new FormControl('', { validators: [Validators.required] }),
    });

    ngOnInit(): void {
        this.requestId = this.parseRequestId();
        
        if (this.requestId) {
            this.facade.validatePasswordResetRequest(this.requestId);
        }
    }

    parseRequestId(): string | undefined {
        const urlSegments = this.route.snapshot.url;

        if (urlSegments && urlSegments.length > 0) {
            return urlSegments[1].path;
        } 

        return undefined;
    }

    onSubmit() {
        if (this.form.get('password')?.invalid) {
            this.validationErrorSubject.next('Password is required.');
            return;
        }

        if (this.form.get('confirmPassword') != this.form.get('password')) {
            this.validationErrorSubject.next('Passwords do not match.');
            return;
        }

        this.validationErrorSubject.next(null);

        const { password } = this.form.value;

        this.updateUserPassword(password);
    }

    updateUserPassword(password: string) {

    }
}