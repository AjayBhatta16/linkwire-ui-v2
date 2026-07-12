import { CommonModule } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BehaviorSubject } from "rxjs";
import { LoginFacade } from "../login.facade";
import { Router } from "@angular/router";

@Component({
    selector: 'linkwire-terms-of-service-dialog',
    templateUrl: './terms-of-service-dialog.component.html',
    imports: [
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatDialogClose,
        MatButtonModule,
        MatFormFieldModule,
        MatCheckboxModule,
        CommonModule,
        ReactiveFormsModule,
    ],
    providers: [
        LoginFacade,
    ],
})
export class TermsOfServiceDialogComponent implements OnInit {
    constructor(private dialogRef: MatDialogRef<TermsOfServiceDialogComponent>) {}

    private facade = inject(LoginFacade);
    private router = inject(Router);

    validationErrorSubject = new BehaviorSubject<string | null>(null);
    validationError$ = this.validationErrorSubject.asObservable();

    user$ = this.facade.user$;
    loading$ = this.facade.loading$;

    form: FormGroup = new FormGroup({
        agreedToLatestTerms: new FormControl(false, { validators: [ Validators.requiredTrue ] }),
    });

    ngOnInit() {
        this.user$.subscribe(user => {
            if (user && user.agreedToLatestTerms) {
                this.router.navigate(['/dashboard']);
                this.dialogRef.close();
            }
        });
    }

    onSubmit() {
        if (this.form.get('agreedToLatestTerms')?.invalid) {
            this.validationErrorSubject.next('You must agree to the updated terms to continue.');
        }

        this.validationErrorSubject.next(null);

        this.postUserAgreedToTerms();
    }

    postUserAgreedToTerms() {
        this.facade.postUserAgreedToTerms();
    }
}