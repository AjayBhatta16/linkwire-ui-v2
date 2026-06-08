import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { PasswordResetRequest, ResetRequestDTO, UpdateUserPasswordRequestDTO, ValidateResetRequestResponseDTO } from "../models/password-reset-request";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { User } from "../models/user";

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

    validatePasswordResetRequest(token: string): Observable<ValidateResetRequestResponseDTO> {
        return this.http.get<ValidateResetRequestResponseDTO>(
            `${environment.API_BASE_URL}/reset-request/${token}`
        );
    }

    updateUserPassword(username: string, body: UpdateUserPasswordRequestDTO): Observable<User> {
        return this.http.post<User>(
            `${environment.API_BASE_URL}/users/${username}/password-update`,
            body
        );
    }
}