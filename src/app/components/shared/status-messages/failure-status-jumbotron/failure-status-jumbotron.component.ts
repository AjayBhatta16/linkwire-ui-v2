import { Component, Input } from "@angular/core";

@Component({
    selector: "linkwire-failure-status-jumbotron",
    templateUrl: "./failure-status-jumbotron.component.html",
})
export class FailureStatusJumbotronComponent {
    @Input() headerText: string = 'Failure!';
    @Input() errorDetailMessage: string = '';
}