import {Route} from '@angular/router';
import {NewsComponent} from './news.component';

export const NEWS_ROUTE: Route = {
    path: 'news',
    component: NewsComponent,
    data: {
        authorities: [],
        pageTitle: 'news.title'
    }
};
