import { inject, Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { selectDisplayLinks, selectUser } from "../../state/selectors/user.selector";

@Injectable()
export class DashboardFacade {
    private store = inject(Store);

    user$ = this.store.select(selectUser);
    links$ = this.store.select(selectDisplayLinks);
}