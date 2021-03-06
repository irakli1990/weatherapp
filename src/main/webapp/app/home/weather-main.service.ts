import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IWeatherMain } from 'app/shared/models/weather-main.model';
import { SERVER_API_URL } from 'app/app.constants';

type EntityResponseType = HttpResponse<IWeatherMain>;

@Injectable({ providedIn: 'root' })
export class HomeService {
    private resourceUrl = SERVER_API_URL + 'api/weather';

    constructor(private http: HttpClient) {}

    find(city: string): Observable<EntityResponseType> {
        return this.http.get<IWeatherMain>(`${this.resourceUrl}/${city}`, { observe: 'response' });
    }
}
