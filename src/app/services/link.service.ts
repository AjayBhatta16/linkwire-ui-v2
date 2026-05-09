import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { CreateLinkRequest, Link } from "../models/link";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class LinkService {
    private http = inject(HttpClient);

    createLink(link: CreateLinkRequest): Observable<Link> {
        return this.http.post<Link>(
            `${environment.API_BASE_URL}/links`,
            link
        );
    }

    fetchLink(linkId: string): Observable<Link> {
        return this.http.get<Link>(
            `${environment.API_BASE_URL}/links/${linkId}`
        );
    }
}