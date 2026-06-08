import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";

@Component({
    selector: "linkwire-success-status-jumbotron",
    templateUrl: "./success-status-jumbotron.component.html",
    imports: [
        CommonModule,
        MatButtonModule,
    ],
})
export class SuccessStatusJumbotronComponent {
    @Input() headerText: string = 'Success!';
    @Input() detailText: string = '';
    @Input() buttonText?: string;

    @Output() buttonClick = new EventEmitter<void>();

    onButtonClick(): void {
        this.buttonClick.emit();
    }
}