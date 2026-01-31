import { createSelector } from "@ngrx/store";
import { linkFeature } from "../features/link.feature";
import { toDisplayClickData } from "../../models/click";

export const {
    selectLink,
    selectLoading,
    selectError,
} = linkFeature;

export const selectClicks = createSelector(
    selectLink,
    (link) => toDisplayClickData(link?.clicks || [])
)

export const selectAccessUri = createSelector(
    selectLink,
    (link) => `https://linkwire.cc/${link?.displayID}`
)