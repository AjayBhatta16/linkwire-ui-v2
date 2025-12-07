import { NgModule } from "@angular/core";
import { provideEffects } from "@ngrx/effects";
import { UserEffects } from "./effects/user.effects";
import { provideStore } from "@ngrx/store";
import { userFeature } from "./features/user.feature";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
    imports: [
        HttpClientModule,
    ],
    providers: [
        provideStore({
            [userFeature.name]: userFeature.reducer
        }),
        provideEffects(UserEffects)
    ]
})
export class StateModule {}