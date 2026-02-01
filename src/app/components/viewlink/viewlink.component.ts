import { Component, inject, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ViewLinkFacade } from "./viewlink.facade";
import { AgGridComponent } from "../shared/ag-grid/ag-grid.component";
import { linkHistoryColDefs, ViewLinkGridContext } from "./viewlink.api";
import { CommonModule } from "@angular/common";
import { DisplayClick } from "../../models/click";
import { MatDialog } from "@angular/material/dialog";
import { ClickDetailsDialogComponent } from "./click-details-dialog/click-details-dialog.component";
import { Clipboard } from '@angular/cdk/clipboard';
import { toSignal } from "@angular/core/rxjs-interop";

@Component({
    selector: 'linkwire-viewlink',
    templateUrl: './viewlink.component.html',
    imports: [
        AgGridComponent,
        CommonModule,
    ],
    providers: [
        ViewLinkFacade,
    ],
})
export class ViewLinkComponent implements OnInit {
    private route = inject(ActivatedRoute);
    private facade = inject(ViewLinkFacade);
    private router = inject(Router);
    private readonly dialog = inject(MatDialog);
    private clipboard = inject(Clipboard);

    clicks$ = this.facade.clicks$
    link$ = this.facade.link$;
    accessUri$ = this.facade.accessUri$;

    accessUri = toSignal(this.accessUri$);

    linkID?: string | null;

    colDefs = linkHistoryColDefs;
    context: ViewLinkGridContext = {
        onViewDetails: this.handleViewDetails.bind(this),
    };

    ngOnInit(): void {
        this.linkID = this.route.snapshot.paramMap.get('linkID');
        
        if (this.linkID) {
            this.facade.fetchLinkDetails(this.linkID);
        }
    }

    handleBack(): void {
        this.router.navigate(['/dashboard']);
    }

    handleViewDetails(click: DisplayClick): void {
        this.dialog.open(ClickDetailsDialogComponent, {
            data: {
                ...click,
            },
            minWidth: 500,
        });
    }

    copyAccessUriToClipboard(): void {
        this.clipboard.copy(this.accessUri() ?? '');
    }
}