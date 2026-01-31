import { ColDef, ICellRendererParams } from "ag-grid-community";
import { DisplayLink } from "../../models/link";
import { CopyButtonRendererComponent } from "../shared/cell-renderers/copy-button-renderer/copy-button-renderer.component";
import { LinkRendererComponent } from "../shared/cell-renderers/link-renderer/link-renderer.component";

export const dashboardColumns: ColDef<DisplayLink>[] = [
    {
        headerName: '#',
        field: 'autoIncrementID',
        width: 80,
    },
    {
        headerName: 'Tracking ID',
        field: 'trackingID',
        width: 150,
        cellRenderer: LinkRendererComponent,
        cellRendererParams: (params: ICellRendererParams<DisplayLink>) => ({
            displayText: params.data?.trackingID,
            routerLink: [`/viewlink/${params.data?.trackingID}`]
        })
    },
    {
        headerName: 'Access URL',
        field: 'accessURL',
        cellRenderer: CopyButtonRendererComponent,
        cellRendererParams: (params: ICellRendererParams<DisplayLink>) => ({
            textContent: params.data?.accessURL,
            valueToCopy: params.data?.accessURL,
        })
    },
    {
        headerName: 'Note',
        field: 'note',
        filter: 'agTextColumnFilter',
    },
    {
        headerName: 'Click Count',
        field: 'clickCount',
        width: 150,
        filter: 'agNumberColumnFilter',
    }
]