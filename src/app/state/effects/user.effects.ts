import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserService } from "../../services/user.service";
import { userDataRefreshFailure, userDataRefreshRequest, userDataRefreshSuccess, userLogin, userLoginFailure, userLoginSuccess, userSignup, userSignupFailure, userSignupSuccess } from "../actions/user.actions";
import { catchError, map, of, switchMap } from "rxjs";

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
                    map(res => userLoginSuccess({ userInfo: res.data })),
                    catchError(error => of(userLoginFailure({ error })))
                );
            })
        )
    )

    signup$ = createEffect(() => 
        this.actions$.pipe(
            ofType(userSignup),
            switchMap(({ username, email, password }) => 
                this.userService.signup(username, email, password).pipe(
                    map(res => userSignupSuccess({ userInfo: res.data })),
                    catchError(error => of(userSignupFailure({ error })))
                )
            )
        )
    )

    refreshUserData$ = createEffect(() => 
        this.actions$.pipe(
            ofType(userDataRefreshRequest),
            switchMap(({ username }) => 
                this.userService.refreshUserData(username).pipe(
                    map(res => userDataRefreshSuccess({ userInfo: res.data })),
                    catchError(error => of(userDataRefreshFailure({ error })))
                )
            )
        )
    )
}