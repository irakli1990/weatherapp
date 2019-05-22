import {Route} from '@angular/router';
import {ForecastComponent} from './index';

export const FORECAST_ROUTE: Route = {
    path: 'forecast',
    component: ForecastComponent,
    data: {
        authorities: [],
        pageTitle: 'forecast.title'
    }
};
