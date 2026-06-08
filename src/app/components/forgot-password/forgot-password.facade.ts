import { inject, Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { selectError, selectLoading, selectSuccess } from "../../state/selectors/password-reset.selectors";
import { postPasswordResetRequest } from "../../state/actions/password-reset.actions";

@Injectable()
export class ForgotPasswordFacade {
    store = inject(Store);

    loading$ = this.store.select(selectLoading);
    error$ = this.store.select(selectError);
    success$ = this.store.select(selectSuccess);

    requestPasswordReset(email: string) {
        this.store.dispatch(postPasswordResetRequest({ email }));
    }
}