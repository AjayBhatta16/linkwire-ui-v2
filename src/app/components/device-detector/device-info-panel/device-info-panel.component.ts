import { Component, Input } from "@angular/core";
import { GetDeviceInfoResponseDTO } from "../../../models/device-detector";

@Component({
    selector: 'linkwire-device-info-panel',
    templateUrl: './device-info-panel.component.html'
})
export class DeviceInfoPanelComponent {
    @Input() data: GetDeviceInfoResponseDTO | null | undefined;
    @Input() defaultText: string = 'Unknown';
}