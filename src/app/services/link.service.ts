import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { CreateLinkRequest, Link } from "../models/link";
import { Observable } from "rxjs";
import { LegacyApiResponse } from "../models/legacy-api-response";

@Injectable({
    providedIn: 'root'
})
export class LinkService {
    private http = inject(HttpClient);

    createLink(link: CreateLinkRequest): Observable<LegacyApiResponse<Link>> {
        return this.http.post<LegacyApiResponse<Link>>(
            'https://linkwire.cc/link/create',
            link
        );
    }
}