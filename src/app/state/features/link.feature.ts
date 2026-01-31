import { createFeature, createReducer, on } from "@ngrx/store";
import { Link } from "../../models/link";
import { createLink, createLinkFailure, createLinkSuccess, fetchLinkDetails, fetchLinkDetailsFailure, fetchLinkDetailsSuccess } from "../actions/link.actions";

interface LinkState {
    link: Link | null;
    loading: boolean;
    error: string | null;
}

export const initialLinkState: LinkState = {
    link: null,
    loading: false,
    error: null
};

export const linkFeature = createFeature({
    name: 'link',
    reducer: createReducer(
        initialLinkState,
        on(createLink, (state) => ({
            ...state,
            loading: true,
            error: null,
        })),
        on(createLinkSuccess, (state, { link }) => ({
            ...state,
            link,
            loading: false,
            error: null,
        })),
        on(createLinkFailure, (state, { error }) => ({
            ...state,
            loading: false,
            error,
        })),
        on(fetchLinkDetails, (state) => ({
            ...state,
            loading: true,
            error: null,
        })),
        on(fetchLinkDetailsSuccess, (state, { link }) => ({
            ...state,
            link,
            loading: false,
            error: null,
        })),
        on(fetchLinkDetailsFailure, (state, { error }) => ({
            ...state,
            loading: false,
            error,
        }))
    )
});