import { Component, Input } from "@angular/core";
import { FeatureCardData } from "../../landing-page.api";

@Component({
    selector: 'linkwire-feature-card',
    templateUrl: './feature-card.component.html',
})
export class FeatureCardComponent {
    @Input() feature!: FeatureCardData;
}