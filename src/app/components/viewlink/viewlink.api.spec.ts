import { linkHistoryColDefs, ViewLinkGridContext } from './viewlink.api';
import { DisplayClick } from '../../models/click';

describe('linkHistoryColDefs', () => {
    it('should define the correct columns', () => {
        expect(linkHistoryColDefs).toHaveLength(4);

        expect(linkHistoryColDefs[0]).toMatchObject({
            field: 'autoIncrementID',
            headerName: '#',
            width: 75,
        });

        expect(linkHistoryColDefs[1]).toMatchObject({
            field: 'displayTimestamp',
            headerName: 'Timestamp',
            width: 200,
        });

        expect(linkHistoryColDefs[2]).toMatchObject({
            field: 'ip',
            headerName: 'IP Address',
            filter: 'agTextColumnFilter',
            width: 150,
        });

        expect(linkHistoryColDefs[3]).toMatchObject({
            headerName: 'Details',
            width: 75,
            cellRenderer: expect.any(Function),
            cellRendererParams: expect.any(Object),
        });
    });

    it('should call onViewDetails with correct data when icon action is clicked', () => {
        const mockOnViewDetails = jest.fn();
        const mockClick: DisplayClick = { id: 1 } as DisplayClick;
        const params = {
            context: { onViewDetails: mockOnViewDetails } as ViewLinkGridContext,
            data: mockClick,
        };

        // Find the details column
        const detailsCol = linkHistoryColDefs[3];
        const actions = detailsCol.cellRendererParams.actions;
        expect(actions).toHaveLength(1);

        // Simulate click
        actions[0].onClick(params);

        expect(mockOnViewDetails).toHaveBeenCalledWith(mockClick);
    });

    it('should have correct icon class for the details action', () => {
        const detailsCol = linkHistoryColDefs[3];
        const actions = detailsCol.cellRendererParams.actions;
        expect(actions[0].iconClass).toBe('fa-solid fa-circle-info text-primary');
    });
});