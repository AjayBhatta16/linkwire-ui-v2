import { inject, Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { 
    selectError,
    selectSuccess,
} from "../../../state/selectors/password-reset.selectors";
import { updateUserPassword } from "../../../state/actions/password-reset.actions";
import { selectUser } from "../../../state/selectors/user.selector";

@Injectable()
export class ChangePasswordFacade {
    private store = inject(Store);

    error$ = this.store.select(selectError);
    success$ = this.store.select(selectSuccess);
    user$ = this.store.select(selectUser);

    updateUserPassword(username: string, oldPassword: string, newPassword: string): void {
        var body = {
            oldPassword,
            newPassword,
        };

        this.store.dispatch(updateUserPassword({ username, body }));
    }
}