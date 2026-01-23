import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DashboardFacade } from '../dashboard.facade';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, combineLatest, distinctUntilChanged, map } from 'rxjs';
import { detectJSONChanges } from '../../../utils/pipe-utils';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { urlValidator } from '../../../utils/form-utils';

@Component({
    selector: 'app-add-link-dialog',
    templateUrl: './add-link-dialog.component.html',
    imports: [
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatDialogClose,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        CommonModule,
    ],
    providers: [
        DashboardFacade,
    ],
})
export class AddLinkDialogComponent {
    constructor(private dialogRef: MatDialogRef<AddLinkDialogComponent>) {}

    private facade = inject(DashboardFacade);

    loading$ = this.facade.linkLoading$;

    validationErrorSubject = new BehaviorSubject<string | null>(null);
    validationError$ = this.validationErrorSubject.asObservable();
    
    error$ = combineLatest([
        this.facade.linkError$, 
        this.validationError$
    ]).pipe(
        distinctUntilChanged(detectJSONChanges),
        map(([facadeError, validationError]) => {
            return validationError ?? facadeError;
        })
    );

    form: FormGroup = new FormGroup({
        redirectURL: new FormControl('', { validators: [ Validators.required, urlValidator ] }),
        note: new FormControl(''),
    });

    onSubmit() {
        if (this.form.get('redirectURL')?.invalid) {
            this.validationErrorSubject.next('A valid URL is required.');
            return;
        }

        this.validationErrorSubject.next(null);

        const { redirectURL, note } = this.form.value;

        this.createLink(redirectURL, note);
    }

    createLink(redirectURL: string, note: string | null): void {
        this.facade.createLink(redirectURL, note);
    }

    onClose(): void {
        this.dialogRef.close();
    }
}