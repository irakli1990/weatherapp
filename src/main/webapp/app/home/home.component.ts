import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';
import { LoginModalService, AccountService, Account } from 'app/core';
import { JhiAlertService } from 'ng-jhipster';
import { HomeService } from 'app/home/weather-main.service';
import { Chart } from 'chart.js';
import { saveAs } from 'file-saver/dist/FileSaver';
import * as jsPDF from 'jspdf';
import { ChartType } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import * as html2canvas from 'html2canvas';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective } from 'ng2-charts';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: ['home.css']
})
export class HomeComponent implements OnInit {
    @ViewChild('content') content: ElementRef;

    @ViewChild(BaseChartDirective) chart: BaseChartDirective;
    account: Account;
    modalRef: NgbModalRef;
    links: any;
    parseLinks: any;
    totalItems: any;
    weatherMain: any;
    weatherForCity: string;
    randomtemp: number;
    randomtempMax: number;
    randomtempMin: number;
    humidity: number;
    presure: number;

    ngOnInit() {
        this.accountService.identity().then((account: Account) => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();
        setInterval(() => {
            console.log(this.randomTemp());
        }, 1500);
    }

    public lineChartData: ChartDataSets[] = [{ data: [], label: 'Series A' }, { data: [], label: 'Series B' }];
    public lineChartLabels: Label[] = [
        'Katowice',
        'Tbilisi',
        'Paris',
        'Moscow',
        'Washington',
        'Tokyo',
        'Praga',
        'Budapest',
        'Zagreb',
        'Kutaisi',
        'Kiev',
        'Bratislava'
    ];
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
    public lineChartLegend = true;
    public lineChartType = 'line';
    public barChartOptions: ChartOptions = {
        responsive: true,
        // We use these empty structures as placeholders for dynamic theming.
        scales: { xAxes: [{}], yAxes: [{}] },
        plugins: {
            datalabels: {
                anchor: 'end',
                align: 'end'
            }
        }
    };
    public barChartLabels: Label[] = ['Temperatura ' + this.getDate()];
    public barChartType: ChartType = 'bar';
    public barChartLegend = true;
    public barChartPlugins = [pluginDataLabels];

    public barChartData: ChartDataSets[] = [
        { data: [], label: 'Temp' },
        { data: [], label: 'Temp Min' },
        {
            data: [],
            label: 'Temp Max'
        }
    ];

    constructor(
        private accountService: AccountService,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager,
        private alertService: JhiAlertService,
        private homeService: HomeService
    ) {}

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', message => {
            this.accountService.identity().then(account => {
                this.account = account;
            });
        });
    }

    randomTemp() {
        const tempArraynew = [];
        const tempArraynew2 = [];
        const tempArray1 = [12, 12.5, 4, 7, 9, 8, 7, 13.5, 7, 8, 7, 8];
        for (let i = 1; i <= 12; i++) {
            tempArraynew.push(Math.floor(Math.random() * (tempArray1.length - i) + 1));
        }
        this.lineChartData[0].data = tempArraynew;
        const tempArray2 = [1, 13.5, 4, 7.3, 9.2, 8, 23, 13.5, 11, 12.3, 3, 2];
        for (let i = 1; i <= 12; i++) {
            tempArraynew2.push(Math.floor(Math.random() * (tempArray2.length - i) + 1));
        }
        this.lineChartData[1].data = tempArraynew2;

        this.chart.update();
    }

    getDate() {
        const d = new Date();
        d.setDate(d.getDate());
        return d.toLocaleDateString();
    }

    isAuthenticated() {
        return this.accountService.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.weatherMain = data;
    }

    private onError(error) {
        this.alertService.error(error.error, error.message, null);
    }

    findCityWeather(city: string) {
        const temperature = [];
        const temperatureMin = [];
        const temperatureMax = [];
        this.homeService.find(city).subscribe(
            res => {
                this.randomtemp = res.body.temp;
                this.randomtempMax = res.body.tempMax;
                this.randomtempMin = res.body.tempMin;
                this.humidity = res.body.humidity;
                this.presure = res.body.pressure;

                temperature.push(this.randomtemp);
                temperatureMax.push(this.randomtempMax);
                console.log(this.randomtemp, this.randomtempMax, this.randomtempMin);
                temperatureMin.push(this.randomtempMin);
                this.barChartData[0].data = temperature;
                this.barChartData[1].data = temperatureMin;
                this.barChartData[2].data = temperatureMax;
            },
            error => (this.weatherMain = <any>error)
        );
    }

    downloadPDF2() {
        html2canvas(document.getElementById('dataforpdf')).then(function(canvas) {
            const img = canvas.toDataURL('image/png');
            const doc = new jsPDF('p', 'pt', 'a4');
            const width = doc.internal.pageSize.getWidth();
            const height = doc.internal.pageSize.getHeight();
            doc.addImage(img, 'JPEG', 0, 0, width, height);
            doc.save('testCanvas.pdf');
        });
    }

    // findCityWeatherForecast(city: string) {
    //     this.homeForecastService.findForecast(city).subscribe(
    //         res => {
    //             this.tempObject = res;
    //             this.temp
    //
    //
    //             let weatherDates = [];
    //             this.forecastDate.forEach((res) => {
    //                 const jsdate = new Date(res * 1000);
    //                 weatherDates.push(jsdate.toLocaleDateString('pl', {
    //                     year: 'numeric',
    //                     month: 'numeric',
    //                     day: 'numeric'
    //                 }))
    //             })
    //             console.log(this.tempObject);
    //         },
    //         error => (this.weatherMain = <any>error)
    //     );
    // }
}
