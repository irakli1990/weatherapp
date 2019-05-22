import {Injectable} from '@angular/core';
import {SERVER_API_URL} from "app/app.constants";
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import {INews} from "app/shared/models/news";

type EntityResponseType = HttpResponse<INews>;
type EntityArrayResponseType = HttpResponse<INews[]>;


@Injectable({providedIn: 'root'})
export class NewsService {
    constructor(private http: HttpClient) {
    }

    private resourceUrlForGetRequest = SERVER_API_URL + '/api/news/get-news';
    private resourceUrlForPostRequest = SERVER_API_URL + '/api/news/save-news';
    private resourceUrlForDeleteRequest = SERVER_API_URL + '/api/news/delete-news';

    create(news: INews): Observable<EntityResponseType> {
        return this.http.post<INews>(this.resourceUrlForPostRequest, news, {observe: 'response'});
    }

    findAll(): Observable<EntityArrayResponseType> {
        return this.http.get<INews[]>(this.resourceUrlForGetRequest, {observe: 'response'});
    }

    delete(id: number): Observable<EntityResponseType> {
        return this.http.delete<INews>(`${this.resourceUrlForDeleteRequest}/${id}`, {observe: 'response'});
    }


}
