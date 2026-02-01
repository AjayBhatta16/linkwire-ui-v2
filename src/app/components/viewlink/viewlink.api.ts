import { ColDef } from "ag-grid-community";
import { DisplayClick } from "../../models/click";
import { IconActionsRendererComponent, IconActionsRendererParams } from "../shared/cell-renderers/icon-actions-renderer/icon-actions-renderer.component";

export type ViewLinkGridContext = {
    onViewDetails: (click: DisplayClick) => void;
}

export const linkHistoryColDefs: ColDef<DisplayClick>[] = [
    {
        field: 'autoIncrementID',
        headerName: '#',
        width: 75,
    },
    {
        field: 'displayTimestamp',
        headerName: 'Timestamp',
        width: 200,
    },
    {
        field: 'ip',
        headerName: 'IP Address',
        filter: 'agTextColumnFilter',
        width: 150,
    },
    {
        headerName: 'Details',
        width: 75,
        cellRenderer: IconActionsRendererComponent,
        cellRendererParams: {
            actions: [
                {
                    iconClass: 'fa-solid fa-circle-info text-primary',
                    onClick: (params: IconActionsRendererParams) => {
                        const context = params.context as ViewLinkGridContext;
                        const data = params.data as DisplayClick;
                        context.onViewDetails(data);
                    }
                }
            ]
        }
    },
];