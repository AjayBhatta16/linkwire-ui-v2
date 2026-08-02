import { Component, inject, Input } from "@angular/core";
import { RouterModule } from "@angular/router";
import { LogoutConfirmationDialogComponent } from "./logout-confirmation-dialog/logout-confirmation-dialog.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
    selector: 'linkwire-app-header',
    templateUrl: './app-header.component.html',
    styleUrls: [
        './app-header.component.css',
    ],
    imports: [
        RouterModule,
    ],
})
export class AppHeaderComponent {
    @Input() isLoggedIn: boolean = false;

    private readonly dialog = inject(MatDialog);

    openLogoutConfirmationDialog() {
        this.dialog.open(LogoutConfirmationDialogComponent, {
          width: '400px',
        });
    }
}