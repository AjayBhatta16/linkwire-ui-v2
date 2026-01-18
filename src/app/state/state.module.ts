import { NgModule } from "@angular/core";
import { provideEffects } from "@ngrx/effects";
import { UserEffects } from "./effects/user.effects";
import { provideStore } from "@ngrx/store";
import { userFeature } from "./features/user.feature";
import { HttpClientModule } from "@angular/common/http";
import { linkFeature } from "./features/link.feature";
import { LinkEffects } from "./effects/link.effects";

@NgModule({
    imports: [
        HttpClientModule,
    ],
    providers: [
        provideStore({
            [userFeature.name]: userFeature.reducer,
            [linkFeature.name]: linkFeature.reducer,
        }),
        provideEffects([
            UserEffects,
            LinkEffects,
        ])
    ]
})
export class StateModule {}