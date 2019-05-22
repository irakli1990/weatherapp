import {Route} from '@angular/router';
import {NewsListComponent} from "app/entities/news/news-list/news-list.component";
import {NewsAddComponent} from "app/entities/news/news-add/news-add.component";

export const NEWSLIST_ROUTE: Route = {

    path: 'news-list',
    component: NewsListComponent,
    data: {
        authorities: [],
        pageTitle: 'NewsList.title'
    }
};
export const ADDNEWS_ROUTE: Route = {

    path: 'add-news',
    component: NewsAddComponent,
    data: {
        authorities: [],
        pageTitle: 'AddNews.title'
    }
};
