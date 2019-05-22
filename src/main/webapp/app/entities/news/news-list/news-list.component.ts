import {Component, OnInit} from '@angular/core';
import {NewsService} from "app/entities/news/news.service";
import {INews} from "app/shared/models/news";

@Component({
    selector: 'jhi-news-list',
    templateUrl: './news-list.component.html',
    styles: []
})
export class NewsListComponent implements OnInit {

    news = [];

    constructor(private newsService: NewsService) {
    }


    ngOnInit() {
        this.newsService.findAll().subscribe(
            res => {
                this.news = res.body;
            }
        );
    }

}
