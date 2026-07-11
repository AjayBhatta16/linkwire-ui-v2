import { NgModule } from "@angular/core";
import { provideEffects } from "@ngrx/effects";
import { UserEffects } from "./effects/user.effects";
import { provideStore } from "@ngrx/store";
import { userFeature } from "./features/user.feature";
import { HttpClientModule } from "@angular/common/http";
import { linkFeature } from "./features/link.feature";
import { LinkEffects } from "./effects/link.effects";
import { passwordResetFeature } from "./features/password-reset.feature";
import { PasswordResetEffects } from "./effects/password-reset.effects";
import { ToolEffects } from "./effects/tool.effects";
import { toolFeature } from "./features/tool.feature";
import { contactFeature } from "./features/contact.feature";
import { ContactEffects } from "./effects/contact.effects";

@NgModule({
    imports: [
        HttpClientModule,
    ],
    providers: [
        provideStore({
            [userFeature.name]: userFeature.reducer,
            [linkFeature.name]: linkFeature.reducer,
            [passwordResetFeature.name]: passwordResetFeature.reducer,
            [toolFeature.name]: toolFeature.reducer,
            [contactFeature.name]: contactFeature.reducer,
        }),
        provideEffects([
            UserEffects,
            LinkEffects,
            PasswordResetEffects,
            ToolEffects,
            ContactEffects,
        ])
    ]
})
export class StateModule {}