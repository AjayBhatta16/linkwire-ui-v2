import { CommonModule } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";
import { DashboardFacade } from "./dashboard.facade";
import { dashboardColumns } from "./dashboard.api";
import { MatButtonModule } from "@angular/material/button";
import { AgGridComponent } from "../shared/ag-grid/ag-grid.component";
import { MatDialog } from "@angular/material/dialog";
import { AddLinkDialogComponent } from "./add-link-dialog/add-link-dialog.component";
import { take } from "rxjs";

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
    private facade = inject(DashboardFacade);
    private readonly dialog = inject(MatDialog);

    user$ = this.facade.user$;
    links$ = this.facade.links$;

    colDefs = dashboardColumns;

    ngOnInit(): void {
        this.user$
            .pipe(take(1))
            .subscribe(user => {
                if (user == null) {
                    this.facade.refreshUserData();
                }
            });
    }

    handleAddLink() {
        this.dialog.open(AddLinkDialogComponent, { minWidth: 500 });
    }
}