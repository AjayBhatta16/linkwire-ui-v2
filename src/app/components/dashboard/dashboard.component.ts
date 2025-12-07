import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { DashboardFacade } from "./dashboard.facade";

@Component({
    selector: 'linkwire-dashboard',
    template: '<p>Welcome {{ (user$ | async)?.username }}</p>',
    imports: [
        CommonModule,
    ],
    providers: [
        DashboardFacade,
    ],
})
export class DashboardComponent {
    private facade = inject(DashboardFacade);

    user$ = this.facade.user$;
}