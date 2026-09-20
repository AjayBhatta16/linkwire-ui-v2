import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CTAOverviewSectionComponent } from "./cta-overview-section/cta-overview-section.component";
import { FeaturesSectionComponent } from "./features-section/features-section.component";
import { AboutSectionComponent } from "./about-section/about-section.component";
import { GatheredInfoSectionComponent } from "./gathered-info-section/gathered-info-section.component";

@Component({
    selector: 'linkwire-landing-page',
    templateUrl: './landing-page.component.html',
    styleUrls: ['./landing-page.component.css'],
    imports: [
        CommonModule,
        CTAOverviewSectionComponent,
        FeaturesSectionComponent,
        AboutSectionComponent,
        GatheredInfoSectionComponent,
    ],
})
export class LandingPageComponent {}