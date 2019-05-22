import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import {SERVER_API_URL} from 'app/app.constants';
import {IBrowserHistory} from 'app/shared/models/history';
import 'rxjs/add/operator/map';

type EntityResponseType = HttpResponse<IBrowserHistory>;
type EntityArrayResponseType = HttpResponse<IBrowserHistory[]>;


@Injectable({providedIn: 'root'})
export class HistoryService {
    constructor(private http: HttpClient) {
    }

    private resourceUrlForGetRequest = SERVER_API_URL + '/api/history/get-history';
    private resourceUrlForPostRequest = SERVER_API_URL + '/api/history/save-history';
    private resourceUrlForDeleteRequest = SERVER_API_URL + '/api/history/delete-history';

    create(history: IBrowserHistory): Observable<EntityResponseType> {
        return this.http.post<IBrowserHistory>(this.resourceUrlForPostRequest, history, {observe: 'response'});
    }

    findAll(): Observable<EntityArrayResponseType> {
        return this.http.get<IBrowserHistory[]>(this.resourceUrlForGetRequest, {observe: 'response'});
    }

    delete(id: number): Observable<EntityResponseType> {
        return this.http.delete<IBrowserHistory>(`${this.resourceUrlForDeleteRequest}/${id}`, {observe: 'response'});
    }

}
