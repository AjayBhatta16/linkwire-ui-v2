import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ContactService } from "../../services/contact.service";
import { postContactRequest, postContactRequestFailure, postContactRequestSuccess } from "../actions/contact.actions";
import { catchError, map, of, switchMap } from "rxjs";

@Injectable()
export class ContactEffects {
    private actions$ = inject(Actions);
    private contactService = inject(ContactService);

    postContactRequest$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(postContactRequest),
            switchMap(({ request }) => {
                return this.contactService.postContactRequest(request).pipe(
                    map(() => postContactRequestSuccess()),
                    catchError(error => of(postContactRequestFailure({ error: error.error })))
                );
            })
        );
    });
}