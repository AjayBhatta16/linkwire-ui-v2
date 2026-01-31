import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { createLink, createLinkFailure, createLinkSuccess, fetchLinkDetails, fetchLinkDetailsFailure, fetchLinkDetailsSuccess } from "../actions/link.actions";
import { catchError, map, of, switchMap } from "rxjs";
import { LinkService } from "../../services/link.service";

@Injectable()
export class LinkEffects {
    private actions$ = inject(Actions);
    private linkService = inject(LinkService);

    createLink$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(createLink),
            switchMap(({ link }) => {
                return this.linkService.createLink(link).pipe(
                    map(res => createLinkSuccess({ link: res.data })),
                    catchError(error => of(createLinkFailure({ error })))
                );
            })
        );
    });

    fetchLink$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(fetchLinkDetails),
            switchMap(({ linkId }) => {
                return this.linkService.fetchLink(linkId).pipe(
                    map(res => fetchLinkDetailsSuccess({ link: res.data })),
                    catchError(error => of(fetchLinkDetailsFailure({ error })))
                );
            })
        );
    });
}