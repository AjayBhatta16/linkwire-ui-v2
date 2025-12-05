import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserService } from "../../services/user.service";
import { userLogin, userLoginFailure, userLoginSuccess, userSignup, userSignupFailure, userSignupSuccess } from "../actions/user.actions";
import { catchError, map, of, switchMap } from "rxjs";

@Injectable()
export class UserEffects {
    private actions$ = inject(Actions);
    private userService = inject(UserService);

    login$ = createEffect(() => 
        this.actions$.pipe(
            ofType(userLogin),
            switchMap(({ username, password }) => 
                this.userService.login(username, password).pipe(
                    map(user => userLoginSuccess({ userInfo: user })),
                    catchError(error => of(userLoginFailure({ error })))
                )
            )
        )
    )

    signup$ = createEffect(() => 
        this.actions$.pipe(
            ofType(userSignup),
            switchMap(({ username, email, password }) => 
                this.userService.signup(username, email, password).pipe(
                    map(user => userSignupSuccess({ userInfo: user })),
                    catchError(error => of(userSignupFailure({ error })))
                )
            )
        )
    )
}