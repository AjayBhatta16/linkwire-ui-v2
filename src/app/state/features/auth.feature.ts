import { createFeature, createReducer, on } from "@ngrx/store";
import { authLogin, authLogout, authLogoutComplete, authReload } from "../actions/auth.actions";
import { AUTH_TOKEN_KEY } from "../../utils/auth-utils";

interface AuthState {
    loggedIn: boolean;
    token: string | null;
    logoutCounter: number;
}

export const initialAuthState: AuthState = {
    loggedIn: false,
    token: null,
    logoutCounter: 0,
};

export const authFeature = createFeature({
    name: 'auth',
    reducer: createReducer(
        initialAuthState,
        on(authLogin, (state, { token }) => ({
            ...state,
            loggedIn: true,
            token,
        })),
        on(authLogout, state => ({
            ...state,
            loggedIn: false,
            token: null,
        })),
        on(authReload, state => {
            var token = localStorage.getItem(AUTH_TOKEN_KEY);

            if (!!token) {
                return {
                    ...state,
                    loggedIn: true,
                    token,
                };
            }

            return {
                ...state,
                loggedIn: false,
                token: null,
            }
        }),
        on(authLogoutComplete, state => ({
            ...state,
            logoutCounter: state.logoutCounter + 1,
        }))
    )
});