import { Observable, of, tap } from "rxjs";
import { User } from "../models/user";
import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { LegacyApiResponse } from "../models/legacy-api-response";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private http = inject(HttpClient);
    private authService = inject(AuthService);

    login(username: string, password: string): Observable<LegacyApiResponse<User>> {
        return this.http.post<LegacyApiResponse<User>>(
            'https://linkwire.cc/user/verify', 
            { 
                username, 
                password 
            }
        ).pipe(
            tap(response => {
                if (!!response.token) {
                    this.authService.login(response.token);
                }
            })
        );
    }

    signup(username: string, email: string, password: string): Observable<LegacyApiResponse<User>> {
        return this.http.post<LegacyApiResponse<User>>(
            'https://linkwire.cc/user/create', 
            { 
                username, 
                email, 
                password 
            }
        ).pipe(
            tap(response => {
                if (!!response.token) {
                    this.authService.login(response.token);
                }
            })
        );
    } 
}