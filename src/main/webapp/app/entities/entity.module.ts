import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NewsListComponent} from './news/news-list/news-list.component';
import {NewsAddComponent} from './news/news-add/news-add.component';
import {RouterModule} from '@angular/router';
import {ADDNEWS_ROUTE, NEWSLIST_ROUTE} from 'app/entities/news/news.route';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms'



@NgModule({
    declarations: [NewsListComponent, NewsAddComponent],
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        FormsModule,
        RouterModule.forRoot([ADDNEWS_ROUTE]),
        RouterModule.forRoot([NEWSLIST_ROUTE])
    ]
})
export class EntityModule {
}
