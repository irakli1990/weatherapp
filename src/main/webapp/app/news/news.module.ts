import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NewsComponent} from './news.component';
import {RouterModule} from '@angular/router';
import {NEWS_ROUTE} from "app/news/news.route";
import {MatCardModule, MatButtonModule} from '@angular/material'

@NgModule({
    declarations: [NewsComponent],
    imports: [
        CommonModule,
        MatButtonModule,
        MatCardModule,
        RouterModule.forChild([NEWS_ROUTE])

    ]
})
export class NewsModule {
}
