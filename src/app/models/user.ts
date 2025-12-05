import { Link } from "./link";

export type User = {
    username: string;
    email: string;
    premiumUser: boolean;
    links: Link[];
}