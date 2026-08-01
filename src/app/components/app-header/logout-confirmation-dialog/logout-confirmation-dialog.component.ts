import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from "@angular/material/dialog";

@Component({
    selector: 'linkwire-logout-confirmation-dialog',
    templateUrl: './logout-confirmation-dialog.component.html',
    imports: [
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatDialogClose,
        MatButtonModule,
        CommonModule,
    ]
})
export class LogoutConfirmationDialogComponent {
    onSubmit() {
        
    }
}