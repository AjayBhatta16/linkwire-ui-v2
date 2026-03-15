import { dashboardColumns } from './dashboard.api';
import { LinkRendererComponent } from '../shared/cell-renderers/link-renderer/link-renderer.component';
import { CopyButtonRendererComponent } from '../shared/cell-renderers/copy-button-renderer/copy-button-renderer.component';
import { DisplayLink } from '../../models/link';

describe('dashboardColumns', () => {
    it('should define 5 columns', () => {
        expect(dashboardColumns.length).toBe(5);
    });

    it('should have correct headers and fields', () => {
        expect(dashboardColumns[0].headerName).toBe('#');
        expect(dashboardColumns[0].field).toBe('autoIncrementID');

        expect(dashboardColumns[1].headerName).toBe('Tracking ID');
        expect(dashboardColumns[1].field).toBe('trackingID');

        expect(dashboardColumns[2].headerName).toBe('Access URL');
        expect(dashboardColumns[2].field).toBe('accessURL');

        expect(dashboardColumns[3].headerName).toBe('Note');
        expect(dashboardColumns[3].field).toBe('note');

        expect(dashboardColumns[4].headerName).toBe('Click Count');
        expect(dashboardColumns[4].field).toBe('clickCount');
    });

    it('should use correct cell renderers', () => {
        expect(dashboardColumns[1].cellRenderer).toBe(LinkRendererComponent);
        expect(dashboardColumns[2].cellRenderer).toBe(CopyButtonRendererComponent);
    });

    it('should generate correct cellRendererParams for Tracking ID', () => {
        const row: DisplayLink = { trackingID: 'abc123' } as DisplayLink;
        const params = { data: row };
        const cellParams = dashboardColumns[1].cellRendererParams!(params as any);
        expect(cellParams.displayText).toBe('abc123');
        expect(cellParams.routerLink).toEqual(['/viewlink/abc123']);
    });

    it('should generate correct cellRendererParams for Access URL', () => {
        const row: DisplayLink = { accessURL: 'https://test.com' } as DisplayLink;
        const params = { data: row };
        const cellParams = dashboardColumns[2].cellRendererParams!(params as any);
        expect(cellParams.textContent).toBe('https://test.com');
        expect(cellParams.valueToCopy).toBe('https://test.com');
    });

    it('should set filters for Note and Click Count columns', () => {
        expect(dashboardColumns[3].filter).toBe('agTextColumnFilter');
        expect(dashboardColumns[4].filter).toBe('agNumberColumnFilter');
    });

    it('should set widths for specific columns', () => {
        expect(dashboardColumns[0].width).toBe(80);
        expect(dashboardColumns[1].width).toBe(150);
        expect(dashboardColumns[4].width).toBe(150);
    });
});