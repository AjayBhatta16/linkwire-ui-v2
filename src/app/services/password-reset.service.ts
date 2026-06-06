import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { PasswordResetRequest, ResetRequestDTO } from "../models/password-reset-request";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class PasswordResetService {
    private http = inject(HttpClient);

    postPasswordResetRequest(request: ResetRequestDTO): Observable<PasswordResetRequest>{
        return this.http.post<PasswordResetRequest>(
            `${environment.API_BASE_URL}/reset-request`,
            request
        );
    }
}