import { createSelector } from "@ngrx/store";
import { linkFeature } from "../features/link.feature";
import { toDisplayData } from "../../models/link";

export const {
    selectLink,
    selectLoading,
    selectError,
} = linkFeature;

export const selectClicks = createSelector(
    selectLink,
    (link) => link?.clicks ?? []
)

export const selectAccessUri = createSelector(
    selectLink,
    (link) => toDisplayData([link!])[0].accessURL
)