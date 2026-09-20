import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CTAOverviewSectionComponent } from "./cta-overview-section/cta-overview-section.component";

@Component({
    selector: 'linkwire-landing-page',
    templateUrl: './landing-page.component.html',
    styleUrls: ['./landing-page.component.css'],
    imports: [
        CommonModule,
        CTAOverviewSectionComponent,
    ],
})
export class LandingPageComponent {}