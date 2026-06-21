import { createFeature, createReducer, on } from "@ngrx/store";
import { GetDeviceInfoResponseDTO } from "../../models/device-detector";
import { getDeviceInfo, getDeviceInfoError, getDeviceInfoSuccess } from "../actions/tool.actions";

interface ToolState {
    userAgent: string;
    loading: boolean;
    error: string | null;
    deviceInfo: GetDeviceInfoResponseDTO | null;
}

export const initialToolState : ToolState = {
    userAgent: '',
    loading: false,
    error: null,
    deviceInfo: null,
}

export const toolFeature = createFeature({
    name: 'tools',
    reducer: createReducer(
        initialToolState,
        on(getDeviceInfo, (state, { userAgent }) => ({
            ...state,
            userAgent,
            loading: true,
            error: null,
            deviceInfo: null,
        })),
        on(getDeviceInfoSuccess, (state, { response }) => ({
            ...state,
            loading: false,
            error: null,
            deviceInfo: response,
        })),
        on(getDeviceInfoError, (state, { error }) => ({
            ...state,
            loading: false,
            error,
        }))
    )
})