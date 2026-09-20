
export interface FeatureCardData {
    iconClass: string;
    titleText: string;
    description?: string;
}

export const highlightedFeatures: FeatureCardData[] = [
    {
        iconClass: "fa-solid fa-link",
        titleText: "Shorten URLs",
        description: "Enter a URL you want people to be redirected to, and we will give you a shorter link that takes them there.",
    },
    {
        iconClass: "fa-solid fa-magnifying-glass-chart",
        titleText: "Track Access In Real Time",
        description: "When your link is accessed, you will be able to view the details from the portal and receive an email overview within seconds.",
    },
    {
        iconClass: "fa-solid fa-user-gear",
        titleText: "Break Down User Agents",
        description: "If you have a user agent string you got from a less user-friendly logger (not mentioning any names), you can extrapolate all of the details with our device detector page.",
    },
];