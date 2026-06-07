import { Component, computed, inject, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PasswordResetsFacade } from "./password-resets.facade";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { FailureStatusJumbotronComponent } from "../shared/status-messages/failure-status-jumbotron/failure-status-jumbotron.component";
import { toSignal } from "@angular/core/rxjs-interop";

@Component({
    selector: "linkwire-password-resets",
    templateUrl: "./password-resets.component.html",
    imports: [
        CommonModule,
        FailureStatusJumbotronComponent,
        ReactiveFormsModule,
    ],
    providers: [PasswordResetsFacade],
})
export class PasswordResetsComponent implements OnInit {
    constructor(private route: ActivatedRoute) {}

    facade = inject(PasswordResetsFacade);

    requestId?: string;

    activeResetRequest = toSignal(this.facade.activeResetRequest$);
    error = toSignal(this.facade.error$);

    errorDetailMessage = computed(() => {
        const error = this.error();

        if (!error) {
            return '';
        }

        if (error === 'Expired') {
            return 'This password reset link has expired.\nPlease submit a new password reset request.';
        }

        if (error === 'Not Found') {
            return 'This password reset link is invalid.\nPlease submit a new password reset request.';
        }

        return 'An unexpected error occurred. Please try again later.';
    });

    ngOnInit(): void {
        this.requestId = this.parseRequestId();
        
        if (this.requestId) {
            this.facade.validatePasswordResetRequest(this.requestId);
        }
    }

    parseRequestId(): string | undefined {
        const urlSegments = this.route.snapshot.url;

        if (urlSegments && urlSegments.length > 0) {
            return urlSegments[1].path;
        } 

        return undefined;
    }
}