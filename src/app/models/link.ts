import { Click } from "./click";

export type Link = {
    trackingID: string;
    displayID: string;
    redirectURL: string;
    note: string;
    siteTitle?: string;
    siteDescription?: string;
    siteBannerURL?: string;
    useLogin: boolean;
    loginPageBrand?: string;
    createdBy: string;
    clicks: Click[];
}

export type CreateLinkRequest = {
    redirectURL: string;
    note: string;
}

export type DisplayLink = {
    autoIncrementID: number;
    trackingID: string;
    accessURL: string;
    note: string;
    clickCount: number;
}

export function toDisplayData(links: Link[]): DisplayLink[] {
    return links.map((link, index) => ({
        autoIncrementID: index + 1,
        trackingID: link.trackingID,
        accessURL: `https://linkwire.cc/${link.displayID}`,
        note: link.note,
        clickCount: link.clicks.length
    }));
}