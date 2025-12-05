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
        console.log(`Logging in user: ${username}`);

        return of({
            username: username,
            email: 'test@email.com',
            premiumUser: false,
            links: []
        })
    }

    signup(username: string, email: string, password: string): Observable<User> {
        console.log(`Signing up user: ${username} with email: ${email}`);

        return of({
            username: username,
            email: email,
            premiumUser: false,
            links: []
        })
    } 
}