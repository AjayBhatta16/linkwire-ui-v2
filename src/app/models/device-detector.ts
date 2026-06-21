export type GetDeviceInfoRequestDTO = {
    userAgent: string;
}

export type GetDeviceInfoResponseDTO = {
    type: string;
    brand: string;
    model: string;
    osName: string;
    osVersion: string;
    clientType: string;
    clientName: string;
    clientVersion: string;
}