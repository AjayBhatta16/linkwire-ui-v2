import { createSelector } from "@ngrx/store";
import { userFeature } from "../features/user.feature";
import { toDisplayData } from "../../models/link";

export const {
    selectUser,
    selectLoading,
    selectError
} = userFeature;

export const selectDisplayLinks = createSelector(
    selectUser, 
    (user) => {
        return toDisplayData(user?.links || []);
    }
)