import { Component, inject, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ViewLinkFacade } from "./viewlink.facade";
import { AgGridComponent } from "../shared/ag-grid/ag-grid.component";
import { linkHistoryColDefs } from "./viewlink.api";
import { CommonModule } from "@angular/common";

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

    clicks$ = this.facade.clicks$
    link$ = this.facade.link$;
    accessUri$ = this.facade.accessUri$;

    linkID?: string | null;

    colDefs = linkHistoryColDefs;

    ngOnInit(): void {
        this.linkID = this.route.snapshot.paramMap.get('linkID');
        
        if (this.linkID) {
            this.facade.fetchLinkDetails(this.linkID);
        }
    }

    handleBack(): void {
        this.router.navigate(['/dashboard']);
    }
}