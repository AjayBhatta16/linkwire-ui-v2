import { createAction, props } from "@ngrx/store";
import { ContactRequestDTO } from "../../models/contact-dto";

const actionNames = {
    POST_CONTACT_REQUEST: "[Contact] Post Contact Request",
    POST_CONTACT_REQUEST_SUCCESS: "[Contact] Post Contact Request Success",
    POST_CONTACT_REQUEST_FAILURE: "[Contact] Post Contact Request Failure",
}

export const postContactRequest = createAction(
    actionNames.POST_CONTACT_REQUEST,
    props<{
        request: ContactRequestDTO;
    }>()
);

export const postContactRequestSuccess = createAction(
    actionNames.POST_CONTACT_REQUEST_SUCCESS
);

export const postContactRequestFailure = createAction(
    actionNames.POST_CONTACT_REQUEST_FAILURE,
    props<{
        error: any;
    }>()
);
