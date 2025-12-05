import { createAction, props } from "@ngrx/store";
import { User } from "../../models/user";

const actionNames = {
    USER_LOGIN: "[User] User Login",
    USER_LOGIN_SUCCESS: "[User] User Login Success",
    USER_LOGIN_FAILURE: "[User] User Login Failure",
    USER_SIGNUP: "[User] User Signup",
    USER_SIGNUP_SUCCESS: "[User] User Signup Success",
    USER_SIGNUP_FAILURE: "[User] User Signup Failure",
}

export const userLogin = createAction(
    actionNames.USER_LOGIN,
    props<{
        username: string;
        password: string;
    }>()
);

export const userLoginSuccess = createAction(
    actionNames.USER_LOGIN_SUCCESS,
    props<{
        userInfo: User;
    }>()
);

export const userLoginFailure = createAction(
    actionNames.USER_LOGIN_FAILURE,
    props<{
        error: any;
    }>()
);

export const userSignup = createAction(
    actionNames.USER_SIGNUP,
    props<{
        username: string;
        email: string;
        password: string;
    }>()
);

export const userSignupSuccess = createAction(
    actionNames.USER_SIGNUP_SUCCESS,
    props<{
        userInfo: User;
    }>()
);

export const userSignupFailure = createAction(
    actionNames.USER_SIGNUP_FAILURE,
    props<{
        error: any;
    }>()
);