import {Component, OnInit} from '@angular/core';
import {ChartDataSets, ChartOptions,ChartType} from 'chart.js';
import {Color} from 'ng2-charts';
import {Label} from 'ng2-charts';
import {IMain} from 'app/shared/models/main-model';
import {ForecastService} from "app/forecast/forecast.service";
import * as html2canvas from 'html2canvas';
import * as jsPDF from 'jspdf';
import {AccountService} from "app/core";


@Component({
    selector: 'jhi-forecast',
    templateUrl: './forecast.component.html',
    styles: []
})
export class ForecastComponent implements OnInit {

    cityForForecast: any;
    main: IMain;
    tmp_min: any;
    tmp_max: any;
    alldates: any;
    weatherDates = [];
    jsDate: Date;
    hasdata:boolean = false;


    constructor(private _dailyForecast: ForecastService,private accountService: AccountService) {
    }

    ngOnInit() {

    }

    findForecast(city) {
        this._dailyForecast.findForecast(city).subscribe(res => {
            this.tmp_min = res['body'].map(res => res.main.temp);
            this.tmp_max = res['body'].map(res => res.main.tempMax);
            this.alldates = res['body'].map(res => res.dt);

            console.log(this.tmp_max);
            console.log(this.tmp_min);

            this.alldates.forEach((res) => {
                this.jsDate = new Date(res * 1000);
                this.weatherDates.push(this.jsDate.toLocaleDateString('pl', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                }));
                console.log(this.weatherDates);
                this.lineChartData[0].data = this.tmp_max;
                this.lineChartData[1].data = this.tmp_min;
                this.barChartData[0].data = this.tmp_max;
                this.barChartData[1].data = this.tmp_min;
                this.hasdata = true;
            })
        })
    }

    private chart: any;


    public lineChartLegend = true;
    public lineChartType = 'line';
    public lineChartData: ChartDataSets[] = [
        {
            data: [],
            label: 'Tmp min'
        },
        {
            data: [],
            label: 'Tmp max'
        }];
    public lineChartLabels: Label[] = this.weatherDates;
    public lineChartOptions: ChartOptions & { annotation: any } = {
        responsive: true,
        scales: {
            // We use this empty structure as a placeholder for dynamic theming.
            xAxes: [{}],
            yAxes: [
                {
                    id: 'y-axis-0',
                    position: 'left'
                },
                {
                    id: 'y-axis-1',
                    position: 'right',
                    gridLines: {
                        color: 'rgba(255,0,0,0.3)'
                    },
                    ticks: {
                        fontColor: 'red'
                    }
                }
            ]
        },
        annotation: {
            annotations: [
                {
                    type: 'line',
                    mode: 'vertical',
                    scaleID: 'x-axis-0',
                    value: 'March',
                    borderColor: 'orange',
                    borderWidth: 2,
                    label: {
                        enabled: true,
                        fontColor: 'orange',
                        content: 'LineAnno'
                    }
                }
            ]
        }
    };
    public lineChartColors: Color[] = [
        {
            // grey
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        },
        {
            // dark grey
            backgroundColor: 'rgba(77,83,96,0.2)',
            borderColor: 'rgba(77,83,96,1)',
            pointBackgroundColor: 'rgba(77,83,96,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(77,83,96,1)'
        },
        {
            // red
            backgroundColor: 'rgba(255,0,0,0.3)',
            borderColor: 'red',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        }
    ];

    public barChartOptions: ChartOptions = {
        responsive: true,
        // We use these empty structures as placeholders for dynamic theming.
        scales: { xAxes: [{}], yAxes: [{}] },
    };
    public barChartLabels: Label[] = this.weatherDates;
    public barChartType: ChartType = 'bar';
    public barChartLegend = true;

    public barChartData: ChartDataSets[] = [
        { data: [], label: 'Series A' },
        { data: [], label: 'Series B' }
    ];

    downloadPDF2() {
        html2canvas(document.getElementById('dataforpdf')).then(function (canvas) {
            const img = canvas.toDataURL('image/png');
            const doc = new jsPDF('p', 'pt', 'a4');
            const width = doc.internal.pageSize.getWidth();
            const height = doc.internal.pageSize.getHeight();
            doc.addImage(img, 'JPEG', 0, 0, width, height/2);
            doc.save('testCanvas.pdf');
        });
    }
    isAuthenticated() {
        return this.accountService.isAuthenticated();
    }
}
