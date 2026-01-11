import { CommonModule } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";
import { DashboardFacade } from "./dashboard.facade";
import { AgGridAngular } from "ag-grid-angular";
import { dashboardColumns } from "./dashboard.api";
import { MatButtonModule } from "@angular/material/button";

@Component({
    selector: 'linkwire-dashboard',
    templateUrl: './dashboard.component.html',
    imports: [
        AgGridAngular,
        CommonModule,
        MatButtonModule,
    ],
    providers: [
        DashboardFacade,
    ],
})
export class DashboardComponent {
    private facade = inject(DashboardFacade);

    user$ = this.facade.user$;
    links$ = this.facade.links$;

    colDefs = dashboardColumns;

    handleAddLink() {
        // TODO: implement
    }
}