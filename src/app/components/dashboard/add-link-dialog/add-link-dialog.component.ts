import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

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
    ],
})
export class AddLinkDialogComponent {
    constructor(private dialogRef: MatDialogRef<AddLinkDialogComponent>) {}

    onClose(): void {
        this.dialogRef.close();
    }
}