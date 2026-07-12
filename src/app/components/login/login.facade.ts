import { inject, Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { selectError, selectLoading, selectUser } from "../../state/selectors/user.selector";
import { postUserAgreedToTerms, userLogin } from "../../state/actions/user.actions";
import { toSignal } from "@angular/core/rxjs-interop";

@Injectable()
export class LoginFacade {
    store = inject(Store);

    loading$ = this.store.select(selectLoading);
    error$ = this.store.select(selectError);
    user$ = this.store.select(selectUser);

    user = toSignal(this.user$);

    login(username: string, password: string) {
        this.store.dispatch(userLogin({ username, password }));
    }

    postUserAgreedToTerms() {
        let user = this.user();

        if (!!user) {
            this.store.dispatch(postUserAgreedToTerms({ username: user.username }));
        }
    }
}