import { CommonModule } from "@angular/common";
import { Component, DestroyRef, inject, OnInit } from "@angular/core";
import { DashboardFacade } from "./dashboard.facade";
import { dashboardColumns } from "./dashboard.api";
import { MatButtonModule } from "@angular/material/button";
import { AgGridComponent } from "../shared/ag-grid/ag-grid.component";
import { MatDialog } from "@angular/material/dialog";
import { AddLinkDialogComponent } from "./add-link-dialog/add-link-dialog.component";
import { distinctUntilChanged, take } from "rxjs";
import { detectJSONChanges } from "../../utils/pipe-utils";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
    selector: 'linkwire-dashboard',
    templateUrl: './dashboard.component.html',
    imports: [
        AgGridComponent,
        CommonModule,
        MatButtonModule,
    ],
    providers: [
        DashboardFacade,
    ],
})
export class DashboardComponent implements OnInit {
    private destroyRef = inject(DestroyRef);
    private facade = inject(DashboardFacade);
    private readonly dialog = inject(MatDialog);

    user$ = this.facade.user$;
    links$ = this.facade.links$;
    activeLink$ = this.facade.activeLink$;

    colDefs = dashboardColumns;

    ngOnInit(): void {
        this.user$
            .pipe(take(1))
            .subscribe(_ => {
                this.facade.refreshUserData();
            });
    }

    handleAddLink() {
        this.facade.clearSelectedLink();
        
        this.activeLink$
            .pipe(
                distinctUntilChanged(detectJSONChanges),
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe(link => {
                if (link === null) {
                    this.dialog.open(AddLinkDialogComponent, { minWidth: 500 });
                }
            })
    }
}