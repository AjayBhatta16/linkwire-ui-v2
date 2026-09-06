import { Component } from "@angular/core";
import { FAQs } from "./faqs.api";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'linkwire-faqs',
    templateUrl: './faqs.component.html',
    imports: [
        CommonModule,
    ],
})
export class FaqsComponent {
    FAQs = FAQs;
}