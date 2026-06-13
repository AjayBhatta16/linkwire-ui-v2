import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { DeviceDetectorFacade } from "./device-detector.facade";
import { toSignal } from "@angular/core/rxjs-interop";

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
    providers: [
        DeviceDetectorFacade,
    ],
})
export class DeviceDetectorComponent {
    facade = inject(DeviceDetectorFacade);

    loading = toSignal(this.facade.loading$);
    deviceInfo = toSignal(this.facade.deviceInfo$);

    form: FormGroup = new FormGroup({
        userAgent: new FormControl('', { validators: [Validators.required] }),
    });

    onSubmit() {
        const { userAgent } = this.form.value;

        this.detectDevice(userAgent);
    }

    detectDevice(userAgent: string) {
        this.facade.getDeviceInfo(userAgent);
    }
}