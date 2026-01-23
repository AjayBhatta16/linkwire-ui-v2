import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'linkwire-viewlink',
    template: '<p>View Link <strong>{{ linkID }}</strong></p>'
})
export class ViewLinkComponent implements OnInit {
    linkID?: string | null;

    constructor(private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.linkID = this.route.snapshot.paramMap.get('linkID');
    }
}