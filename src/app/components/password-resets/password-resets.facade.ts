import { inject, Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { 
    selectActiveResetRequest,
    selectError,
} from "../../state/selectors/password-reset.selectors";
import { validatePasswordResetRequest } from "../../state/actions/password-reset.actions";

@Injectable()
export class PasswordResetsFacade {
    private store = inject(Store);

    activeResetRequest$ = this.store.select(selectActiveResetRequest);
    error$ = this.store.select(selectError);

    validatePasswordResetRequest(token: string): void {
        this.store.dispatch(validatePasswordResetRequest({ token }));
    }
}