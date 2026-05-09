import { Observable, tap } from "rxjs";
import { User } from "../models/user";
import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { Link } from "../models/link";
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private http = inject(HttpClient);
    private authService = inject(AuthService);

    login(username: string, password: string): Observable<User> {
        return this.http.post<User>(
            `${environment.API_BASE_URL}/users/login`, 
            { 
                username, 
                password 
            },
            { withCredentials: true }
        ).pipe(
            tap(response => this.authService.login(response))
        );
    }

    signup(username: string, email: string, password: string): Observable<User> {
        return this.http.post<User>(
            `${environment.API_BASE_URL}/users/signup`, 
            { 
                username, 
                email, 
                password 
            },
            { withCredentials: true }
        ).pipe(
            tap(response => this.authService.login(response))
        );
    }

    refreshUserData(username: string): Observable<Link[]> {
        return this.http.get<Link[]>(
            `${environment.API_BASE_URL}/username/${username}/links`,
            { withCredentials: true }
        );
    }
}