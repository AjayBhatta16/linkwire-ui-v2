import { inject, Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { 
    selectActiveResetRequest,
    selectError,
    selectSuccess,
} from "../../state/selectors/password-reset.selectors";
import { updateUserPassword, validatePasswordResetRequest } from "../../state/actions/password-reset.actions";

@Injectable()
export class PasswordResetsFacade {
    private store = inject(Store);

    activeResetRequest$ = this.store.select(selectActiveResetRequest);
    error$ = this.store.select(selectError);
    success$ = this.store.select(selectSuccess);

    validatePasswordResetRequest(token: string): void {
        this.store.dispatch(validatePasswordResetRequest({ token }));
    }

    updateUserPassword(username: string, newPassword: string, resetRequestId: string): void {
        var body = {
            resetRequestId,
            newPassword,
        };

        this.store.dispatch(updateUserPassword({ username, body }));
    }
}