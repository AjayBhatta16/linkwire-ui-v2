import { ColDef } from "ag-grid-community";
import { DisplayLink } from "../../models/link";

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
    },
    {
        headerName: 'Access URL',
        field: 'accessURL',
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