import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { GetDeviceInfoRequestDTO, GetDeviceInfoResponseDTO } from "../models/device-detector";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ToolService {
    private http = inject(HttpClient);

    getDeviceInfo(request: GetDeviceInfoRequestDTO): Observable<GetDeviceInfoResponseDTO> {
        return this.http.post<GetDeviceInfoResponseDTO>(
            `${environment.API_BASE_URL}/device-info`,
            request
        );
    }
}