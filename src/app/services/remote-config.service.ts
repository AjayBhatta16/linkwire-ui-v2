import { Injectable, inject } from '@angular/core';
import { RemoteConfig, fetchAndActivate, getBoolean } from '@angular/fire/remote-config';
import { Observable, interval, map, startWith } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RemoteConfigService {
    private remoteConfig: RemoteConfig = inject(RemoteConfig);

    FETCH_INTERVAL_MILLIS = 5 * 1000;

    constructor() {
        this.remoteConfig.settings.minimumFetchIntervalMillis = this.FETCH_INTERVAL_MILLIS;
        this.fetchAndActivate().then(() => console.log('Remote config activiated.'));
    }

    async fetchAndActivate(): Promise<boolean> {
        return await fetchAndActivate(this.remoteConfig);
    }

    getFeatureFlag(featureFlagName: string): boolean {
        var enabled = getBoolean(this.remoteConfig, featureFlagName);
        console.log(`Feature flag ${featureFlagName} is ${enabled ? 'enabled' : 'disabled'}`);
        return enabled;
    }

    getFeatureFlagObservable(featureFlagName: string): Observable<boolean> {
        return interval(this.FETCH_INTERVAL_MILLIS).pipe(
            startWith(0),
            map(() => this.getFeatureFlag(featureFlagName))
        );
    }
}