import { inject, Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { selectError, selectLoading, selectUser } from "../../state/selectors/user.selector";
import { userSignup } from "../../state/actions/user.actions";

@Injectable()
export class SignupFacade {
    store = inject(Store);

    loading$ = this.store.select(selectLoading);
    error$ = this.store.select(selectError);
    user$ = this.store.select(selectUser);

    signup(username: string, password: string, email: string) {
        this.store.dispatch(userSignup({ username, password, email }));
    }
}