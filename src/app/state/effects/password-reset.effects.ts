import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { PasswordResetService } from "../../services/password-reset.service";
import { 
    postPasswordResetRequest, 
    postPasswordResetRequestFailure, 
    postPasswordResetRequestSuccess, 
    updateUserPassword, 
    updateUserPasswordFailure, 
    updateUserPasswordSuccess, 
    validatePasswordResetRequest, 
    validatePasswordResetRequestFailure,
    validatePasswordResetRequestSuccess 
} from "../actions/password-reset.actions";
import { catchError, map, of, switchMap } from "rxjs";

@Injectable()
export class PasswordResetEffects {
    private actions$ = inject(Actions);
    private passwordResetService = inject(PasswordResetService);

    postPasswordResetRequest$ = createEffect(() => 
        this.actions$.pipe(
            ofType(postPasswordResetRequest),
            switchMap((dto) => 
                this.passwordResetService.postPasswordResetRequest(dto).pipe(
                    map(() => postPasswordResetRequestSuccess()),
                    catchError(error => of(postPasswordResetRequestFailure({ error: error.error })))
                )
            )
        )
    );

    validatePasswordResetRequest$ = createEffect(() => 
        this.actions$.pipe(
            ofType(validatePasswordResetRequest),
            switchMap(({ token }) => 
                this.passwordResetService.validatePasswordResetRequest(token).pipe(
                    map(requestData => validatePasswordResetRequestSuccess({ requestData })),
                    catchError(error => of(validatePasswordResetRequestFailure({ error: error.error })))
                )
            )
        )
    );

    updateUserPassword$ = createEffect(() => 
        this.actions$.pipe(
            ofType(updateUserPassword),
            switchMap(({ username, body }) => 
                this.passwordResetService.updateUserPassword(username, body).pipe(
                    map(user => updateUserPasswordSuccess({ user })),
                    catchError(error => of(updateUserPasswordFailure({ error: error.error })))
                )
            )
        )
    );
}