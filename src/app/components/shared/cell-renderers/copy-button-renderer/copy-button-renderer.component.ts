import { Component, inject } from "@angular/core";
import { ICellRendererParams } from "ag-grid-community";
import { Clipboard } from '@angular/cdk/clipboard';

export type CopyButtonRendererParams = ICellRendererParams & {
    textContent: string;
    valueToCopy: string;
}

@Component({
    selector: 'app-copy-button-renderer',
    templateUrl: './copy-button-renderer.component.html',
})
export class CopyButtonRendererComponent {
    private clipboard = inject(Clipboard);

    params!: CopyButtonRendererParams;

    agInit(params: CopyButtonRendererParams): void {
        this.params = params;
    }

    copyToClipboard(): void {
        this.clipboard.copy(this.params.valueToCopy);
    }
}