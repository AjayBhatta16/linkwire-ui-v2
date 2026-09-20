import { Component, Input } from "@angular/core";
import { InfoBubbleData } from "../../landing-page.api";

@Component({
    selector: 'linkwire-info-bubble',
    templateUrl: './info-bubble.component.html',
    styleUrl: './info-bubble.component.css',
})
export class InfoBubbleComponent {
    @Input() info!: InfoBubbleData;
}