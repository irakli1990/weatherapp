import {Component, OnInit} from '@angular/core';
import {NewsService} from 'app/entities/news/news.service';
import {INews} from "app/shared/models/news";
import {Router} from "@angular/router";


@Component({
    selector: 'jhi-news-add',
    templateUrl: './news-add.component.html',
    styleUrls: ['add-news.css']
})
export class NewsAddComponent implements OnInit {
    title: any;
    body: any;
    imageUrl: any;
    author: any;
    news: INews;


    constructor(private newsService: NewsService, private router: Router) {
    }


    ngOnInit() {


    }

    createNews(formValues) {
        this.newsService.create(formValues).subscribe();
        this.router.navigate(["/news-list"]);
    }
}
