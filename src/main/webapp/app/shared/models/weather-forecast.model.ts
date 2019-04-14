import { IWeather } from 'app/shared/models/weather.model';
import { IMain } from 'app/shared/models/main-model';
import { ICloud } from 'app/shared/models/cloud.model';

export class IForecast {
    weather: IWeather;
    main: IMain;
    dtTxt: Date;
    clouds: ICloud;
    dt: Date;
}
