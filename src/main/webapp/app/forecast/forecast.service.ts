import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import {SERVER_API_URL} from 'app/app.constants';
import {IForecast} from 'app/shared/models/weather-forecast.model';

type EntityResponseType = HttpResponse<IForecast>;

@Injectable({providedIn: 'root'})
export class ForecastService {
    constructor(private http: HttpClient) {
    }

    private resourceUrl = SERVER_API_URL + 'api/weather/forecast';

    findForecast(city: string): Observable<any> {
        return this.http.get<any>(`${this.resourceUrl}/${city}`, {observe: 'response'}).map(result => result);
    }
}
