import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserService } from "../../services/user.service";
import { postUserAgreedToTerms, postUserAgreedToTermsFailure, postUserAgreedToTermsSuccess, userDataRefreshFailure, userDataRefreshRequest, userDataRefreshSuccess, userLogin, userLoginFailure, userLoginSuccess, userSignup, userSignupFailure, userSignupSuccess } from "../actions/user.actions";
import { catchError, map, of, switchMap } from "rxjs";
import { authLogout, authLogoutComplete } from "../actions/auth.actions";

@Injectable()
export class UserEffects {
    private actions$ = inject(Actions);
    private userService = inject(UserService);

    login$ = createEffect(() => 
        this.actions$.pipe(
            ofType(userLogin),
            switchMap(({ username, password }) => {
                console.log('login event')
                return this.userService.login(username, password).pipe(
                    map(res => userLoginSuccess({ userInfo: res })),
                    catchError(error => of(userLoginFailure({ error: error.error })))
                );
            })
        )
    )

    signup$ = createEffect(() => 
        this.actions$.pipe(
            ofType(userSignup),
            switchMap(({ username, email, password }) => 
                this.userService.signup(username, email, password).pipe(
                    map(res => userSignupSuccess({ userInfo: res })),
                    catchError(error => of(userSignupFailure({ error: error.error })))
                )
            )
        )
    )

    refreshUserData$ = createEffect(() => 
        this.actions$.pipe(
            ofType(userDataRefreshRequest),
            switchMap(({ username }) => 
                this.userService.refreshUserData(username).pipe(
                    map(res => userDataRefreshSuccess({ links: res })),
                    catchError(error => of(userDataRefreshFailure({ error: error.error })))
                )
            )
        )
    )

    postUserAgreedToTerms$ = createEffect(() => 
        this.actions$.pipe(
            ofType(postUserAgreedToTerms),
            switchMap(({ username }) => 
                this.userService.postUserAgreedToTerms(username).pipe(
                    map(res => postUserAgreedToTermsSuccess({ userInfo: res })),
                    catchError(error => of(postUserAgreedToTermsFailure({ error: error.error })))
                )
            )
        )
    )

    logout$ = createEffect(() =>
        this.actions$.pipe(
            ofType(authLogout),
            switchMap(() =>
                this.userService.logout().pipe(
                    map(() => authLogoutComplete())
                )
            )
        )
    );
}