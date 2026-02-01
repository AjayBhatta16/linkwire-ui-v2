import { Component, Input } from "@angular/core";
import { AgGridAngular } from "ag-grid-angular";
import { DEFAULT_COL_DEF, DEFAULT_SIZE_STRATEGY, DEFAULT_THEME } from "../../../utils/ag-grid-utils";
import { ColDef } from "ag-grid-community";

@Component({
    selector: 'app-ag-grid',
    templateUrl: './ag-grid.component.html',
    imports: [
        AgGridAngular,
    ],
})
export class AgGridComponent<TData, TContext = unknown> {
    @Input() colDefs: ColDef<TData>[] = [];
    @Input() rowData: TData[] = [];
    @Input() context?: TContext;

    autoSizeStrategy = DEFAULT_SIZE_STRATEGY;
    defaultColDef = DEFAULT_COL_DEF;
    theme = DEFAULT_THEME;
}