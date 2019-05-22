import {Component, OnInit, ViewChild} from '@angular/core';
import {HistoryService} from 'app/history/history.service';
import {IBrowserHistory} from "app/shared/models/history";
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import * as html2canvas from 'html2canvas';
import {Color, BaseChartDirective} from 'ng2-charts';
import {Label} from 'ng2-charts';
import * as jsPDF from 'jspdf';
import {AccountService} from "app/core";


@Component({
    selector: 'jhi-history',
    templateUrl: './history.component.html',
    styles: []
})
export class HistoryComponent implements OnInit {
    @ViewChild('chart') chart: BaseChartDirective;

    history = [];
    city = [];
    temp: any;
    tempmax: any;
    hasdata: boolean = false;


    constructor(private _historyService: HistoryService,private accountService: AccountService) {
    }

    ngOnInit() {
        this._historyService.findAll().subscribe(res => {
            console.log(res);
            this.history = res.body;
            this.city = res['body'].map(res => res.city);
            this.temp = res['body'].map(res => res.temp);
            this.tempmax = res['body'].map(res => res.tempMax);
            this.barChartLabels = this.city;
            this.barChartData[0].data = this.temp;
            this.barChartData[1].data = this.tempmax;

        })
        if (this.barChartData != null) {
            this.hasdata = true;
        }


    }


    delete(id: number) {
        console.log("jdksajldjsalkd")
        this._historyService.delete(id).subscribe();
        this.refreshList();
        this.chart.chart.update();


    }

    trackId(index: number, item: IBrowserHistory) {
        return item.id;
    }

    refreshList() {
        this._historyService.findAll().subscribe(res => {
            console.log(res);
            this.history = res.body;
        });
    }

    public barChartOptions: ChartOptions = {
        responsive: true,
        // We use these empty structures as placeholders for dynamic theming.
        scales: {xAxes: [{}], yAxes: [{}]},
    };
    public barChartLabels: Label[] = [];
    public barChartType: ChartType = 'bar';
    public barChartLegend = true;

    public barChartData: ChartDataSets[] = [
        {data: [], label: 'Series A'},
        {data: [], label: 'Series B'}
    ];

    downloadPDF1() {
        html2canvas(document.getElementById('dataforpdf1')).then(function (canvas) {
            const img = canvas.toDataURL('image/png');
            const doc = new jsPDF('p', 'pt', 'a4');
            const width = doc.internal.pageSize.getWidth();
            const height = doc.internal.pageSize.getHeight();
            doc.addImage(img, 'JPEG', 60, 40, width, height / 2);
            doc.save('testCanvas.pdf');
        });
    }
    downloadPDF2() {
        html2canvas(document.getElementById('dataforpdf')).then(function (canvas) {
            const img = canvas.toDataURL('image/png');
            const doc = new jsPDF('p', 'pt', 'a4');
            const width = doc.internal.pageSize.getWidth();
            const height = doc.internal.pageSize.getHeight();
            doc.addImage(img, 'JPEG', 15, 40, width, height / 2);
            doc.save('testCanvas.pdf');
        });
    }
    isAuthenticated() {
        return this.accountService.isAuthenticated();
    }
}
