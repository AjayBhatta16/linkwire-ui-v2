import { Component, inject } from "@angular/core";
import { RouterModule } from "@angular/router";
import { RemoteConfigService } from "../../services/remote-config.service";
import { toSignal } from "@angular/core/rxjs-interop";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'linkwire-landing-page',
    templateUrl: './landing-page.component.html',
    styleUrls: ['./landing-page.component.css'],
    imports: [
        CommonModule,
        RouterModule,
    ],
})
export class LandingPageComponent {
    private readonly remoteConfigService = inject(RemoteConfigService);

    testFeature$ = this.remoteConfigService.getFeatureFlagObservable('TEST_FEATURE');
    testFeatureEnabled = toSignal(this.testFeature$);
}