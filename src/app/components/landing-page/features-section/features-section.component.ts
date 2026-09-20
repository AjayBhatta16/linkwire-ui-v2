import { Component } from "@angular/core";
import { highlightedFeatures } from "../landing-page.api";
import { CommonModule } from "@angular/common";
import { FeatureCardComponent } from "./feature-card/feature-card.component";

@Component({
    selector: 'linkwire-features-section',
    templateUrl: './features-section.component.html',
    imports: [
        CommonModule,
        FeatureCardComponent,
    ]
})
export class FeaturesSectionComponent {
    highlightedFeatures = highlightedFeatures;
}