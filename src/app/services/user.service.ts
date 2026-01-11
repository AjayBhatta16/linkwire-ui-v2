import { Observable, of } from "rxjs";
import { User } from "../models/user";
import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private http = inject(HttpClient);

    login(username: string, password: string): Observable<User> {
        return this.http.post<User>(
            'https://linkwire.cc/user/verify', 
            { 
                username, 
                password 
            }
        );
    }

    signup(username: string, email: string, password: string): Observable<User> {
        return this.http.post<User>(
            'https://linkwire.cc/user/create', 
            { 
                username, 
                email, 
                password 
            }
        );
    } 
}