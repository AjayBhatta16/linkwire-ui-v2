import { createAction, props } from "@ngrx/store"
import { PasswordResetRequest } from "../../models/password-reset-request";

const actionNames = {
    POST_PASSWORD_RESET_REQUEST: '[Password Reset] Post Password Reset Request',
    POST_PASSWORD_RESET_REQUEST_SUCCESS: '[Password Reset] Post Password Reset Success',
    POST_PASSWORD_RESET_REQUEST_FAILURE: '[Password Reset] Post Password Reset Failure',
}

export const postPasswordResetRequest = createAction(
    actionNames.POST_PASSWORD_RESET_REQUEST,
    props<{
        email: string;
    }>()
);

export const postPasswordResetRequestSuccess = createAction(
    actionNames.POST_PASSWORD_RESET_REQUEST_SUCCESS
);

export const postPasswordResetRequestFailure = createAction(
    actionNames.POST_PASSWORD_RESET_REQUEST_FAILURE,
    props<{
        error: any;
    }>()
);