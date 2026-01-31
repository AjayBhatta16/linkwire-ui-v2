import { ColDef } from "ag-grid-community";
import { DisplayClick } from "../../models/click";

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
    },
];