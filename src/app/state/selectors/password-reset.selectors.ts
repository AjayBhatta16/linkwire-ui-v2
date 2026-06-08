import { passwordResetFeature } from "../features/password-reset.feature";

export const {
    selectLoading,
    selectError,
    selectSuccess,
    selectActiveResetRequest,
} = passwordResetFeature;