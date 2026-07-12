import { createAction, props } from "@ngrx/store";
import { User } from "../../models/user";
import { Link } from "../../models/link";

const actionNames = {
    USER_LOGIN: "[User] User Login",
    USER_LOGIN_SUCCESS: "[User] User Login Success",
    USER_LOGIN_FAILURE: "[User] User Login Failure",
    USER_SIGNUP: "[User] User Signup",
    USER_SIGNUP_SUCCESS: "[User] User Signup Success",
    USER_SIGNUP_FAILURE: "[User] User Signup Failure",
    USER_DATA_REFRESH_REQUEST: "[User] User Data Refresh Request",
    USER_DATA_REFRESH_SUCCESS: "[User] User Data Refresh Success",
    USER_DATA_REFRESH_FAILURE: "[User] User Data Refresh Failure",
    POST_USER_AGREED_TO_TERMS: "[User] Post User Agreed To Terms",
    POST_USER_AGREED_TO_TERMS_SUCCESS: "[User] Post User Agreed To Terms Success",
    POST_USER_AGREED_TO_TERMS_FAILURE: "[User] Post User Agreed To Terms Failure",
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

export const userDataRefreshRequest = createAction(
    actionNames.USER_DATA_REFRESH_REQUEST,
    props<{
        username: string;
    }>()
);

export const userDataRefreshSuccess = createAction(
    actionNames.USER_DATA_REFRESH_SUCCESS,
    props<{
        links: Link[];
    }>()
);

export const userDataRefreshFailure = createAction(
    actionNames.USER_DATA_REFRESH_FAILURE,
    props<{
        error: any;
    }>()
);

export const postUserAgreedToTerms = createAction(
    actionNames.POST_USER_AGREED_TO_TERMS,
    props<{
        username: string;
    }>()
);

export const postUserAgreedToTermsSuccess = createAction(
    actionNames.POST_USER_AGREED_TO_TERMS_SUCCESS,
    props<{
        userInfo: User;
    }>()
);

export const postUserAgreedToTermsFailure = createAction(
    actionNames.POST_USER_AGREED_TO_TERMS_FAILURE,
    props<{
        error: any;
    }>()
);