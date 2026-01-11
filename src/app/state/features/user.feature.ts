import { createFeature, createReducer, on } from "@ngrx/store";
import { User } from "../../models/user";
import { userLogin, userLoginFailure, userLoginSuccess, userSignup, userSignupFailure, userSignupSuccess } from "../actions/user.actions";

interface UserState {
    user: User | null;
    loading: boolean;
    error: string | null;
}

export const initialUserState: UserState = {
    user: null,
    loading: false,
    error: null
};

export const userFeature = createFeature({
    name: 'user',
    reducer: createReducer(
        initialUserState,
        on(userLogin, (state) => ({
            ...state,
            loading: true,
            error: null,
        })),
        on(userLoginSuccess, (state, { userInfo }) => ({
            ...state,
            user: userInfo,
            loading: false,
            error: null,
        })),
        on(userLoginFailure, (state, { error }) => ({
            ...state,
            loading: false,
            error,
        })),
        on(userSignup, (state) => ({
            ...state,
            loading: true,
            error: null,
        })),
        on(userSignupSuccess, (state, { userInfo }) => ({
            ...state,
            user: userInfo,
            loading: false,
            error: null,
        })),
        on(userSignupFailure, (state, { error }) => ({
            ...state,
            loading: false,
            error,
        }))
    )
});