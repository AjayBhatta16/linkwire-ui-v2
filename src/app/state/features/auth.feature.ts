import { createFeature, createReducer, on } from "@ngrx/store";
import { authLogin, authLogout, authReload } from "../actions/auth.actions";
import { AUTH_TOKEN_KEY } from "../../utils/auth-utils";

interface AuthState {
    loggedIn: boolean;
    token: string | null;
}

export const initialAuthState: AuthState = {
    loggedIn: false,
    token: null
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
                    loggedIn: true,
                    token,
                };
            }

            return {
                loggedIn: false,
                token: null,
            }
        })
    )
});