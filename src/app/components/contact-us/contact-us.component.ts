import { Component, DestroyRef, inject } from "@angular/core";
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from "@angular/common";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ContactUsFacade } from "./contact-us.facade";
import { BehaviorSubject, combineLatest, distinctUntilChanged, map } from "rxjs";
import { detectJSONChanges } from "../../utils/pipe-utils";
import { SuccessStatusJumbotronComponent } from "../shared/status-messages/success-status-jumbotron/success-status-jumbotron.component";
import { toSignal } from "@angular/core/rxjs-interop";

@Component({
    selector: 'linkwire-contact-us',
    templateUrl: './contact-us.component.html',
    imports: [
        CommonModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        SuccessStatusJumbotronComponent,
    ],
    providers: [
        ContactUsFacade,
    ],
})
export class ContactUsComponent {
    private destroyRef = inject(DestroyRef);
    private facade = inject(ContactUsFacade);

    loading = toSignal(this.facade.loading$);
    success = toSignal(this.facade.success$);

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
        name: new FormControl('', { validators: [Validators.required] }),
        returnEmail: new FormControl('', { validators: [Validators.required, Validators.email] }),
        subject: new FormControl('', { validators: [Validators.required] }),
        message: new FormControl('', { validators: [Validators.required] }),
    })

    onSubmit() {
        if (this.form.get('name')?.invalid) {
            this.validationErrorSubject.next('Name is required.');
            return;
        }

        if (this.form.get('returnEmail')?.invalid) {
            this.validationErrorSubject.next('A valid email is required.');
            return;
        }

        if (this.form.get('subject')?.invalid) {
            this.validationErrorSubject.next('Subject is required.');
            return;
        }

        if (this.form.get('message')?.invalid) {
            this.validationErrorSubject.next('Message is required.');
            return;
        }

        this.validationErrorSubject.next(null);

        this.postContactRequest(
            this.form.get('name')?.value,
            this.form.get('returnEmail')?.value,
            this.form.get('subject')?.value,
            this.form.get('message')?.value
        );
    }

    postContactRequest(name: string, returnEmail: string, subject: string, message: string) {
        this.facade.postContactRequest({ name, returnEmail, subject, message });
    }
}