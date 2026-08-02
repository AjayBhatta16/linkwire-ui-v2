import { CommonModule } from "@angular/common";
import { Component, DestroyRef, inject, OnInit } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from "@angular/material/dialog";
import { AuthService } from "../../../services/auth.service";
import { AddLinkDialogComponent } from "../../dashboard/add-link-dialog/add-link-dialog.component";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { selectLogoutCounter } from "../../../state/selectors/auth.selectors";
import { distinctUntilChanged } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

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
export class LogoutConfirmationDialogComponent implements OnInit {
    constructor(private dialogRef: MatDialogRef<AddLinkDialogComponent>) {}
    
    private readonly authService = inject(AuthService);
    private readonly destroyRef = inject(DestroyRef);
    private readonly router = inject(Router);
    private readonly store = inject(Store);

    logoutCounter$ = this.store.select(selectLogoutCounter);

    ngOnInit(): void {
        this.logoutCounter$.pipe(
            distinctUntilChanged(),
            takeUntilDestroyed(this.destroyRef),
        ).subscribe((count) => {
            if (count > 0) {
                this.onLogoutComplete();
            }
        });
    }

    onLogoutComplete() {
        this.router.navigate(['/']);
        this.dialogRef.close();
    }

    onConfirmLogout() {
        this.authService.logout();
    }
}