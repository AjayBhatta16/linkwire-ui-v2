import { createFeature, createReducer, on } from "@ngrx/store";
import { 
    postPasswordResetRequest, 
    postPasswordResetRequestFailure, 
    postPasswordResetRequestSuccess,
    validatePasswordResetRequest,
    validatePasswordResetRequestFailure,
    validatePasswordResetRequestSuccess,
    updateUserPassword,
    updateUserPasswordSuccess,
    updateUserPasswordFailure
} from "../actions/password-reset.actions";
import { ValidateResetRequestResponseDTO } from "../../models/password-reset-request";

interface PasswordResetState {
    loading: boolean;
    error: string | null;
    success: boolean;
    activeResetRequest: ValidateResetRequestResponseDTO | null;
}

export const initialPasswordResetState: PasswordResetState = {
    loading: false,
    error: null,
    success: false,
    activeResetRequest: null
};

export const passwordResetFeature = createFeature({
    name: 'passwordReset',
    reducer: createReducer(
        initialPasswordResetState,
        on(postPasswordResetRequest, (state) => ({
            ...state,
            loading: true,
            error: null,
            success: false
        })),
        on(postPasswordResetRequestSuccess, (state) => ({
            ...state,
            loading: false,
            error: null,
            success: true
        })),
        on(postPasswordResetRequestFailure, (state, { error }) => ({
            ...state,
            loading: false,
            error,
            success: false
        })),
        on(validatePasswordResetRequest, (state) => ({
            ...state,
            loading: true,
            error: null,
            success: false,
            activeResetRequest: null,
        })),
        on(validatePasswordResetRequestSuccess, (state, { requestData }) => ({
            ...state,
            loading: false,
            error: null,
            success: false,
            activeResetRequest: requestData,
        })),
        on(validatePasswordResetRequestFailure, (state, { error }) => ({
            ...state,
            loading: false,
            error: error.trim(),
            success: false,
        })),
        on(updateUserPassword, (state) => ({
            ...state,
            loading: true,
            error: null,
            success: false
        })),
        on(updateUserPasswordSuccess, (state) => ({
            ...state,
            loading: false,
            error: null,
            success: true
        })),
        on(updateUserPasswordFailure, (state, { error }) => ({
            ...state,
            loading: false,
            error: error.trim(),
            success: false
        }))
    )
});