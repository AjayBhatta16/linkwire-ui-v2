import { createFeature, createReducer, on } from "@ngrx/store";
import { postContactRequest, postContactRequestFailure, postContactRequestSuccess } from "../actions/contact.actions";

interface ContactState {
    loading: boolean;
    success: boolean;
    error: string | null;
}

export const initialContactState: ContactState = {
    loading: false,
    success: false,
    error: null
};

export const contactFeature = createFeature({
    name: 'contact',
    reducer: createReducer(
        initialContactState,
        on(postContactRequest, (state) => ({
            ...state,
            loading: true,
            success: false,
            error: null,
        })),
        on(postContactRequestSuccess, (state) => ({
            ...state,
            loading: false,
            success: true,
            error: null,
        })),
        on(postContactRequestFailure, (state, { error }) => ({
            ...state,
            loading: false,
            success: false,
            error,
        }))
    )
});