import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ICellRendererParams } from "ag-grid-community";

export type LinkRendererParams = ICellRendererParams & {
    displayText: string;
    routerLink: string[];
}

@Component({
    selector: 'app-link-renderer',
    templateUrl: './link-renderer.component.html',
    imports: [
        RouterModule,
    ],
})
export class LinkRendererComponent {
    params!: LinkRendererParams;

    agInit(params: LinkRendererParams): void {
        this.params = params;
    }
}