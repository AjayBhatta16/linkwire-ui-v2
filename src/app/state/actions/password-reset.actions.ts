import { createAction, props } from "@ngrx/store"
import { PasswordResetRequest, UpdateUserPasswordRequestDTO, ValidateResetRequestResponseDTO } from "../../models/password-reset-request";
import { User } from "../../models/user";

const actionNames = {
    POST_PASSWORD_RESET_REQUEST: '[Password Reset] Post Password Reset Request',
    POST_PASSWORD_RESET_REQUEST_SUCCESS: '[Password Reset] Post Password Reset Success',
    POST_PASSWORD_RESET_REQUEST_FAILURE: '[Password Reset] Post Password Reset Failure',
    VALIDATE_PASSWORD_RESET_REQUEST: '[Password Reset] Validate Password Reset Request',
    VALIDATE_PASSWORD_RESET_REQUEST_SUCCESS: '[Password Reset] Validate Password Reset Request Success',
    VALIDATE_PASSWORD_RESET_REQUEST_FAILURE: '[Password Reset] Validate Password Reset Request Failure',
    UPDATE_PASSWORD: '[Password Reset] Update Password',
    UPDATE_PASSWORD_SUCCESS: '[Password Reset] Update Password Success',
    UPDATE_PASSWORD_FAILURE: '[Password Reset] Update Password Failure',
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

export const validatePasswordResetRequest = createAction(
    actionNames.VALIDATE_PASSWORD_RESET_REQUEST,
    props<{
        token: string;
    }>()
);

export const validatePasswordResetRequestSuccess = createAction(
    actionNames.VALIDATE_PASSWORD_RESET_REQUEST_SUCCESS,
    props<{
        requestData: ValidateResetRequestResponseDTO;
    }>()
);

export const validatePasswordResetRequestFailure = createAction(
    actionNames.VALIDATE_PASSWORD_RESET_REQUEST_FAILURE,
    props<{
        error: any;
    }>()
);

export const updateUserPassword = createAction(
    actionNames.UPDATE_PASSWORD,
    props<{
        username: string;
        body: UpdateUserPasswordRequestDTO;
    }>()
);

export const updateUserPasswordSuccess = createAction(
    actionNames.UPDATE_PASSWORD_SUCCESS,
    props<{
        user: User;
    }>()
);

export const updateUserPasswordFailure = createAction(
    actionNames.UPDATE_PASSWORD_FAILURE,
    props<{
        error: any;
    }>()
);