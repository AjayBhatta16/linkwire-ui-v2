import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";

@Component({
    selector: 'linkwire-device-detector',
    templateUrl: './device-detector.component.html',
    styleUrls: ['./device-detector.component.css'],
    imports: [
        CommonModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
    ],
})
export class DeviceDetectorComponent {
    form: FormGroup = new FormGroup({
        userAgent: new FormControl('', { validators: [Validators.required] }),
    });

    onSubmit() {
        const { userAgent } = this.form.value;

        this.detectDevice(userAgent);
    }

    detectDevice(userAgent: string) {

    }
}