import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ToolService } from "../../services/tool.service";
import { getDeviceInfo, getDeviceInfoError, getDeviceInfoSuccess } from "../actions/tool.actions";
import { catchError, map, of, switchMap } from "rxjs";

@Injectable()
export class ToolEffects {
    private readonly actions$ = inject(Actions);
    private readonly toolService = inject(ToolService);

    getDeviceInfo$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(getDeviceInfo),
            switchMap((request) => {
                return this.toolService.getDeviceInfo(request).pipe(
                    map(response => getDeviceInfoSuccess({ response })),
                    catchError((err) => of(getDeviceInfoError({ error: err.error })))
                )
            })
        );
    });
}