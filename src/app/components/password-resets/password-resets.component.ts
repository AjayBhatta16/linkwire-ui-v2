import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: "linkwire-password-resets",
    template: `<div class="container">Password Reset {{ requestId }}</div>`,
})
export class PasswordResetsComponent implements OnInit {
    requestId?: string;

    constructor(private route: ActivatedRoute) {}

    ngOnInit(): void {
        const urlSegments = this.route.snapshot.url;
        if (urlSegments && urlSegments.length > 0) {
            this.requestId = urlSegments[1].path;
        } else {
            this.requestId = undefined;
        }
    }
}