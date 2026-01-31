export type Click = {
    clickID: string;
    ip: string;
    linkID: string;
    timestamp: number;
    userAgent: string;
    os: string;
    client: string;
    device: string;
    location: string;
    isp: string;
    mobile: boolean;
    proxy: boolean;
    hosting: boolean;
    asn: string;
}

export type DisplayClick = Click & {
    autoIncrementID: number;
    displayTimestamp: string;
}

export function toDisplayClickData(clicks: Click[]): DisplayClick[] {
    return clicks
        .sort((a, b) => b.timestamp - a.timestamp)
        .map((click, index) => ({
            ...click,
            autoIncrementID: index + 1,
            displayTimestamp: new Date(click.timestamp).toString(),
        }));
}