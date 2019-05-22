import './vendor.ts';

import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {NgbDatepickerConfig} from '@ng-bootstrap/ng-bootstrap';
import {Ng2Webstorage} from 'ngx-webstorage';
import {NgJhipsterModule} from 'ng-jhipster';
import {MenubarModule} from 'primeng/menubar';
import { FormsModule } from '@angular/forms';


import {AuthExpiredInterceptor} from './blocks/interceptor/auth-expired.interceptor';
import {ErrorHandlerInterceptor} from './blocks/interceptor/errorhandler.interceptor';
import {NotificationInterceptor} from './blocks/interceptor/notification.interceptor';
import {WetherappSharedModule} from 'app/shared';
import {WetherappCoreModule} from 'app/core';
import {WetherappAppRoutingModule} from './app-routing.module';
import {WetherappHomeModule} from './home/home.module';
import {WetherappAccountModule} from './account/account.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ForecastModule} from 'app/forecast/forecast.module';
import {StatisticsModule} from 'app/statistics';
import * as moment from 'moment';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import {
    JhiMainComponent,
    NavbarComponent,
    FooterComponent,
    PageRibbonComponent,
    ActiveMenuDirective,
    ErrorComponent
} from './layouts';
import {NewsModule} from "app/news/news.module";
import {HistoryModule} from "app/history/history.module";
import {EntityModule} from "app/entities/entity.module";

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        Ng2Webstorage.forRoot({prefix: 'jhi', separator: '-'}),
        NgJhipsterModule.forRoot({
            // set below to true to make alerts look like toast
            alertAsToast: false,
            alertTimeout: 5000,
            i18nEnabled: true,
            defaultI18nLang: 'pl'
        }),
        WetherappSharedModule.forRoot(),
        WetherappCoreModule,
        ForecastModule,
        MenubarModule,
        WetherappHomeModule,
        StatisticsModule,
        FormsModule,
        NewsModule,
        EntityModule,
        HistoryModule,
        WetherappAccountModule,
        // jhipster-needle-angular-add-module JHipster will add new module here
        WetherappAppRoutingModule
    ],
    declarations: [JhiMainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, ActiveMenuDirective, FooterComponent],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthExpiredInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorHandlerInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: NotificationInterceptor,
            multi: true
        }
    ],
    bootstrap: [JhiMainComponent]
})
export class WetherappAppModule {
    constructor(private dpConfig: NgbDatepickerConfig) {
        this.dpConfig.minDate = {year: moment().year() - 100, month: 1, day: 1};
    }
}
