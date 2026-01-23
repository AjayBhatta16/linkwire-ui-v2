import { inject, Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { selectDisplayLinks, selectUser } from "../../state/selectors/user.selector";
import { selectError, selectLoading } from "../../state/selectors/link.selectors";
import { createLink } from "../../state/actions/link.actions";

@Injectable()
export class DashboardFacade {
    private store = inject(Store);

    user$ = this.store.select(selectUser);
    links$ = this.store.select(selectDisplayLinks);
    linkError$ = this.store.select(selectError);
    linkLoading$ = this.store.select(selectLoading);

    createLink(redirectURL: string, note: string | null): void {
        this.store.dispatch(createLink({
            link: {
                redirectURL,
                note: note ?? '',
            }
        }))
    }
}