import { createAction, props } from '@ngrx/store';

const actionNames = {
    AUTH_LOGIN: "[Auth] Auth Login",
    AUTH_LOGOUT: "[Auth] Auth Logout",
    AUTH_RELOAD: "[Auth] Auth Reload",
    AUTH_LOGOUT_COMPLETE: "[Auth] Auth Logout Complete",
}

export const authLogin = createAction(
    actionNames.AUTH_LOGIN,
    props<{
        token: string;
    }>()
);

export const authLogout = createAction(
    actionNames.AUTH_LOGOUT
);

export const authReload = createAction(
    actionNames.AUTH_RELOAD
);

export const authLogoutComplete = createAction(
    actionNames.AUTH_LOGOUT_COMPLETE
);