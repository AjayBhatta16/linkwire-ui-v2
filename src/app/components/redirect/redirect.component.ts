import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from '@angular/router';

@Component({
        selector: 'linkwire-redirect',
        template: `
                <p>Redirect <strong>{{ redirectCode }}</strong></p>
        `,
})
export class RedirectComponent implements OnInit {
    redirectCode?: string;

    constructor(private route: ActivatedRoute) {}

    ngOnInit(): void {
        const urlSegments = this.route.snapshot.url;
        if (urlSegments && urlSegments.length > 0) {
            this.redirectCode = urlSegments[0].path;
        } else {
            this.redirectCode = undefined;
        }
    }
}