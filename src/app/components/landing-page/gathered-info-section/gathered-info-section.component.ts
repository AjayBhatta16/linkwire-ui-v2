import { Component } from "@angular/core";
import { gatheredInfo } from "../landing-page.api";
import { InfoBubbleComponent } from "./info-bubble/info-bubble.component";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'linkwire-gathered-info-section',
    templateUrl: './gathered-info-section.component.html',
    imports: [
        CommonModule,
        InfoBubbleComponent,
    ],
})
export class GatheredInfoSectionComponent {
    gatheredInfo = gatheredInfo;
}