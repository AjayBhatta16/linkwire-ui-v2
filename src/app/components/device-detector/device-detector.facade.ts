import { inject, Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { selectDeviceInfo, selectLoading } from "../../state/selectors/tool.selectors";
import { getDeviceInfo } from "../../state/actions/tool.actions";

@Injectable()
export class DeviceDetectorFacade {
    store = inject(Store);

    loading$ = this.store.select(selectLoading);
    deviceInfo$ = this.store.select(selectDeviceInfo);

    getDeviceInfo(userAgent: string) {
        this.store.dispatch(getDeviceInfo({ userAgent }));
    }
}