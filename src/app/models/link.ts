import { Click } from "./click";

export type Link = {
    trackingID: string;
    displayID: string;
    redirectURL: string;
    note: string;
    siteTitle: string;
    siteDescription: string;
    siteBannerURL: string;
    useLogin: boolean;
    loginPageBrand: string;
    createdBy: string;
    clicks: Click[];
}