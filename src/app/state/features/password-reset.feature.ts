import { createFeature, createReducer, on } from "@ngrx/store";
import { postPasswordResetRequest, postPasswordResetRequestFailure, postPasswordResetRequestSuccess } from "../actions/password-reset.actions";

interface PasswordResetState {
    loading: boolean;
    error: string | null;
    success: boolean;
}

export const initialPasswordResetState: PasswordResetState = {
    loading: false,
    error: null,
    success: false,
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
        }))
    )
});