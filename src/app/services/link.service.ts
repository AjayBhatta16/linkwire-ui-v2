import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { CreateLinkRequest, Link } from "../models/link";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class LinkService {
    private http = inject(HttpClient);

    createLink(link: CreateLinkRequest): Observable<Link> {
        return this.http.post<Link>(
            '/api/links',
            link
        );
    }

    fetchLink(linkId: string): Observable<Link> {
        return this.http.get<Link>(
            `/api/links/${linkId}`
        );
    }
}