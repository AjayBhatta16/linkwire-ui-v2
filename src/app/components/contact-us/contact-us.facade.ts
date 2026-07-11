import { inject, Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { selectError, selectLoading, selectSuccess } from "../../state/selectors/contact.selectors";
import { postContactRequest } from "../../state/actions/contact.actions";
import { ContactRequestDTO } from "../../models/contact-dto";

@Injectable()
export class ContactUsFacade {
    store = inject(Store);

    loading$ = this.store.select(selectLoading);
    error$ = this.store.select(selectError)
    success$ = this.store.select(selectSuccess);

    postContactRequest(request: ContactRequestDTO) {
        this.store.dispatch(postContactRequest({ request }));
    }
}