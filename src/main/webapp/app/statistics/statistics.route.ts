import {Route} from '@angular/router';
import {StatisticsComponent} from './index';

export const STAT_ROUTE: Route = {
    path: 'statistic',
    component: StatisticsComponent,
    data: {
        authorities: [],
        pageTitle: 'Statistic.title'
    }
};
