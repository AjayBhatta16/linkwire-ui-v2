import { inject, Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { selectAccessUri, selectClicks, selectLink } from "../../state/selectors/link.selectors";
import { fetchLinkDetails } from "../../state/actions/link.actions";

@Injectable()
export class ViewLinkFacade {
    private store = inject(Store);

    clicks$ = this.store.select(selectClicks);
    link$ = this.store.select(selectLink);
    accessUri$ = this.store.select(selectAccessUri);

    fetchLinkDetails(linkId: string): void {
        this.store.dispatch(fetchLinkDetails({ linkId }));
    }
}