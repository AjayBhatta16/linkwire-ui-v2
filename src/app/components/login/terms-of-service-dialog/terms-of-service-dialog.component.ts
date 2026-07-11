import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BehaviorSubject } from "rxjs";

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
})
export class TermsOfServiceDialogComponent implements OnInit {
    constructor(private dialogRef: MatDialogRef<TermsOfServiceDialogComponent>) {}

    validationErrorSubject = new BehaviorSubject<string | null>(null);
    validationError$ = this.validationErrorSubject.asObservable();

    form: FormGroup = new FormGroup({
        agreeToTerms: new FormControl(false, { validators: [ Validators.requiredTrue ] }),
    });

    ngOnInit() {
        // Subscribe to the facade to close the dialog when the PostUserAgreedToTerms process is complete
    }

    onSubmit() {
        if (this.form.get('agreeToTerms')?.invalid) {
            this.validationErrorSubject.next('You must agree to the updated terms to continue.');
        }

        this.validationErrorSubject.next(null);

        this.postUserAgreedToTerms();
    }

    postUserAgreedToTerms() {
        // Call facade to run the PostUserAgreedToTerms process
    }
}