export type PasswordResetRequest = {
    requestedForUsername: string;
    requestedForEmail: string;
    requestedTimestamp: number;
    expirationTimestamp: number;
    requestId: string;
    resetCompleted: boolean;
}

export type ResetRequestDTO = {
    email: string;
}

export type ValidateResetRequestResponseDTO = {
    username: string;
}

export type UpdateUserPasswordRequestDTO = {
    requestId: string;
    newPassword: string;
}