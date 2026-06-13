import { createAction, props } from "@ngrx/store"
import { GetDeviceInfoResponseDTO } from "../../models/device-detector";

const actionNames = {
    GET_DEVICE_INFO: '[Device Detector] Get Device Info',
    GET_DEVICE_INFO_SUCCESS: '[Device Detector] Get Device Info Success',
    GET_DEVICE_INFO_ERROR: '[Device Detector] Get Device Info Error',
}

export const getDeviceInfo = createAction(
    actionNames.GET_DEVICE_INFO,
    props<{
        userAgent: string,
    }>()
);

export const getDeviceInfoSuccess = createAction(
    actionNames.GET_DEVICE_INFO_SUCCESS,
    props<{
        response: GetDeviceInfoResponseDTO
    }>()
);

export const getDeviceInfoError = createAction(
    actionNames.GET_DEVICE_INFO_ERROR,
    props<{
        error: any
    }>()
);