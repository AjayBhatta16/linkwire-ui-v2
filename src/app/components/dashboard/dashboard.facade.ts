import { inject, Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { selectDisplayLinks, selectUser } from "../../state/selectors/user.selector";
import { selectError, selectLink, selectLoading } from "../../state/selectors/link.selectors";
import { createLink } from "../../state/actions/link.actions";
import { AuthService } from "../../services/auth.service";
import { userDataRefreshRequest } from "../../state/actions/user.actions";

@Injectable()
export class DashboardFacade {
    private authService = inject(AuthService);
    private store = inject(Store);

    user$ = this.store.select(selectUser);
    links$ = this.store.select(selectDisplayLinks);

    linkError$ = this.store.select(selectError);
    linkLoading$ = this.store.select(selectLoading);
    activeLink$ = this.store.select(selectLink);

    createLink(redirectURL: string, note: string | null): void {
        this.store.dispatch(createLink({
            link: {
                redirectURL,
                note: note ?? '',
            }
        }))
    }

    refreshUserData(): void {
        const username = this.authService.getUsername();

        if (username) {
            this.store.dispatch(userDataRefreshRequest({ username }));
        }
    }
}