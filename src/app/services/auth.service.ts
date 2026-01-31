import { inject, Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { authLogin, authLogout } from "../state/actions/auth.actions";
import { AUTH_TOKEN_KEY, USERNAME_KEY } from "../utils/auth-utils";
import { selectLoggedIn, selectToken } from "../state/selectors/auth.selectors";
import { toSignal } from "@angular/core/rxjs-interop";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private store = inject(Store);

    loggedIn$ = this.store.select(selectLoggedIn);

    private token = toSignal(
        this.store.select(selectToken)
    );

    getAuthToken(): string | null {
        return this.token() ?? localStorage.getItem(AUTH_TOKEN_KEY) ?? null;
    }

    getUsername(): string | null {
        return localStorage.getItem(USERNAME_KEY);
    }

    logout(): void {
        localStorage.removeItem(AUTH_TOKEN_KEY);
        localStorage.removeItem(USERNAME_KEY);
        this.store.dispatch(authLogout())
    }

    login(token: string, username: string): void {
        localStorage.setItem(AUTH_TOKEN_KEY, token);
        localStorage.setItem(USERNAME_KEY, username);
        this.store.dispatch(authLogin({ token }));
    }
}