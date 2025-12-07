import { inject, Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { selectError, selectLoading, selectUser } from "../../state/selectors/user.selector";
import { userLogin } from "../../state/actions/user.actions";

@Injectable()
export class LoginFacade {
    store = inject(Store);

    loading$ = this.store.select(selectLoading);
    error$ = this.store.select(selectError);
    user$ = this.store.select(selectUser);

    login(username: string, password: string) {
        this.store.dispatch(userLogin({ username, password }));
    }
}