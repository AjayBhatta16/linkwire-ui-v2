import { Component, Input } from "@angular/core";
import { RouterModule } from "@angular/router";

@Component({
    selector: 'linkwire-app-header',
    templateUrl: './app-header.component.html',
    styleUrls: [
        './app-header.component.css',
    ],
    imports: [
        RouterModule,
    ],
})
export class AppHeaderComponent {
    @Input() isLoggedIn: boolean = false;
}