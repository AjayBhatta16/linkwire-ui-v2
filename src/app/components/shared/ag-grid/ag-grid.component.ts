import { Component, Input } from "@angular/core";
import { AgGridAngular } from "ag-grid-angular";
import { DEFAULT_SIZE_STRATEGY } from "../../../utils/ag-grid-utils";
import { ColDef } from "ag-grid-community";

@Component({
    selector: 'app-ag-grid',
    templateUrl: './ag-grid.component.html',
    imports: [
        AgGridAngular,
    ],
})
export class AgGridComponent<TData> {
    @Input() colDefs: ColDef<TData>[] = [];
    @Input() rowData: TData[] = [];

    autoSizeStrategy = DEFAULT_SIZE_STRATEGY;
}