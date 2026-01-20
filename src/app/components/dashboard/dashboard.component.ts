import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { DashboardFacade } from "./dashboard.facade";
import { dashboardColumns } from "./dashboard.api";
import { MatButtonModule } from "@angular/material/button";
import { AgGridComponent } from "../shared/ag-grid/ag-grid.component";
import { MatDialog } from "@angular/material/dialog";
import { AddLinkDialogComponent } from "./add-link-dialog/add-link-dialog.component";

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
export class DashboardComponent {
    private facade = inject(DashboardFacade);
    private readonly dialog = inject(MatDialog);

    user$ = this.facade.user$;
    links$ = this.facade.links$;

    colDefs = dashboardColumns;

    handleAddLink() {
        this.dialog.open(AddLinkDialogComponent);
    }
}