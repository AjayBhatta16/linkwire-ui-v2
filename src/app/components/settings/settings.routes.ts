import { Routes } from "@angular/router";
import { ChangePasswordComponent } from "./change-password/change-password.component";

export const settingsRoutes: Routes = [
    { path: 'change-password', component: ChangePasswordComponent, title: 'LinkWire - Change Password' }
]