import { Component, Inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from "@angular/material/dialog";
import { DisplayClick } from "../../../models/click";

@Component({
    selector: 'linkwire-click-details-dialog',
    templateUrl: './click-details-dialog.component.html',
    imports: [
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatDialogClose,
        MatButtonModule,
    ],
})
export class ClickDetailsDialogComponent {
    constructor(
        dialogRef: MatDialogRef<ClickDetailsDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DisplayClick
    ) {}
}