import { createAction, props } from "@ngrx/store";
import { CreateLinkRequest, Link } from "../../models/link";

const actionNames = {
    CREATE_LINK: "[Link] Create Link",
    CREATE_LINK_SUCCESS: "[Link] Create Link Success",
    CREATE_LINK_FAILURE: "[Link] Create Link Failure",
    FETCH_LINK_DETAILS: "[Link] Fetch Link Details",
    FETCH_LINK_DETAILS_SUCCESS: "[Link] Fetch Link Details Success",
    FETCH_LINK_DETAILS_FAILURE: "[Link] Fetch Link Details Failure",
}

export const createLink = createAction(
    actionNames.CREATE_LINK,
    props<{
        link: CreateLinkRequest;
    }>()
);

export const createLinkSuccess = createAction(
    actionNames.CREATE_LINK_SUCCESS,
    props<{
        link: Link;
    }>()
);

export const createLinkFailure = createAction(
    actionNames.CREATE_LINK_FAILURE,
    props<{
        error: any;
    }>()
);

export const fetchLinkDetails = createAction(
    actionNames.FETCH_LINK_DETAILS,
    props<{
        linkId: string;
    }>()
);

export const fetchLinkDetailsSuccess = createAction(
    actionNames.FETCH_LINK_DETAILS_SUCCESS,
    props<{
        link: Link;
    }>()
);

export const fetchLinkDetailsFailure = createAction(
    actionNames.FETCH_LINK_DETAILS_FAILURE,
    props<{
        error: any;
    }>()
);