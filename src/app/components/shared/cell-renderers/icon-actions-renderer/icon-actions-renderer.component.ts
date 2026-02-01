import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { ICellRendererParams } from "ag-grid-community";

export type IconAction = {
    iconClass: string;
    onClick: (params: IconActionsRendererParams) => void;
}

export type IconActionsRendererParams = ICellRendererParams & {
    actions: IconAction[];
}

@Component({
    selector: 'app-icon-actions-renderer',
    templateUrl: './icon-actions-renderer.component.html',
    imports: [
        CommonModule,
    ],
})
export class IconActionsRendererComponent {
    params!: IconActionsRendererParams;

    agInit(params: IconActionsRendererParams): void {
        this.params = params;
    }
}