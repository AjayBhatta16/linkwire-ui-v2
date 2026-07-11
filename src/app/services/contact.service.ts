import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { ContactRequestDTO } from "../models/contact-dto";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment.production";

@Injectable({
    providedIn: 'root'
})
export class ContactService {
    private readonly http = inject(HttpClient);

    postContactRequest(request: ContactRequestDTO): Observable<void> {
        return this.http.post<void>(
            `${environment.API_BASE_URL}/contact-request`,
            request
        );
    }
}