import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';
import { LoginModalService, AccountService, Account } from 'app/core';
import { JhiAlertService } from 'ng-jhipster';
import { HomeService } from 'app/home/weather-main.service';
import { HomeForecastService } from 'app/home/weather-forecast.service';
import { Chart } from 'chart.js';
import { saveAs } from 'file-saver/dist/FileSaver';
import * as jsPDF from 'jspdf';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: ['home.css']
})
export class HomeComponent implements OnInit {
    @ViewChild('content') content: ElementRef;
    account: Account;
    modalRef: NgbModalRef;
    links: any;
    parseLinks: any;
    totalItems: any;
    weatherMain: any;
    weatherForCity: string;
    randomtemp: any;
    randomtempMax: any;
    randomtempMin: any;
    tempObject: any;
    cityArray: any;
    chart: any;
    humidity: number;
    presure: number;
    private data: any;

    constructor(
        private accountService: AccountService,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager,
        private alertService: JhiAlertService,
        private homeService: HomeService,
        private homeForecastService: HomeForecastService
    ) {
        this.cityArray = [
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
    }

    ngOnInit() {
        this.accountService.identity().then((account: Account) => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();
        setInterval(() => {
            console.log(this.randomMinGenerator());
            console.log(this.randomtempGenerator());
            this.renderChart(this.randomMinGenerator(), this.randomtempGenerator(), this.cityArray);
        }, 15000);
        this.renderBarChart(this.randomtemp, this.randomtempMin, this.randomtempMax, this.getDate());
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', message => {
            this.accountService.identity().then(account => {
                this.account = account;
            });
        });
    }

    findCityWeatherForecast(city: string) {
        this.homeForecastService.findForecast(city).subscribe(
            res => {
                this.tempObject = res;
                // this.temp

                //
                // let weatherDates = [];
                // this.forecastDate.forEach((res) => {
                //     const jsdate = new Date(res * 1000);
                //     weatherDates.push(jsdate.toLocaleDateString('pl', {
                //         year: 'numeric',
                //         month: 'numeric',
                //         day: 'numeric'
                //     }))
                // })
                console.log(this.tempObject);
            },
            error => (this.weatherMain = <any>error)
        );
    }

    randomMinGenerator() {
        const randoomMin = [];
        const tempArray = [12, 12.5, 4, 7, 9, 8, 7, 13.5, 7, 8, 7, 8];
        for (let i = 0; i < tempArray.length; i++) {
            randoomMin.push(Math.floor(Math.random() * (tempArray.length - i) + 1));
        }
        return randoomMin;
    }

    randomtempGenerator() {
        const randoomTemp = [];
        const tempArray = [3, 1, -4, 4, -2, 8, 7, 3, 2, -2, -1, 5];
        for (let i = 0; i < tempArray.length; i++) {
            randoomTemp.push(Math.floor(Math.random() * (tempArray.length - i) + 1));
        }
        return randoomTemp;
    }

    getDate() {
        const d = new Date();
        d.setDate(d.getDate());
        return d.toLocaleDateString();
    }

    renderChart(data1, data2, labels) {
        var myChart = new Chart('canvas', {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        borderColor: '#23ba1c',
                        label: 'temp min',
                        data: data1
                    },
                    {
                        borderColor: '#4f5bff',
                        label: 'temp max',
                        data: data2
                    }
                ]
            }
        });
        myChart.update();
    }

    renderBarChart(data1, data2, data3, labels) {
        var myChart = new Chart('barcanvas', {
            type: 'Bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        backgroundColor: '#42A5F5',
                        borderColor: '#23ba1c',
                        label: 'temp min',
                        data: data1
                    },
                    {
                        backgroundColor: '#42A5F5',
                        borderColor: '#4f5bff',
                        label: 'temp max',
                        data: data2
                    },
                    {
                        backgroundColor: '#42A5F5',
                        borderColor: '#23ba1c',
                        label: 'temp min',
                        data: data1
                    }
                ]
            }
        });
        myChart.update();
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
        this.homeService.find(city).subscribe(
            res => {
                this.randomtemp = res.body.temp;
                this.randomtempMax = res.body.tempMax;
                this.randomtempMin = res.body.tempMin;
                this.humidity = res.body.humidity;
                this.presure = res.body.pressure;
                console.log(this.randomtemp, this.randomtempMax, this.randomtempMin);
            },
            error => (this.weatherMain = <any>error)
        );
    }

    downloadPDF2() {
        var newCanvas = document.querySelector('#canvas');

        //create image from dummy canvas
        var newCanvasImg = newCanvas.toDataURL('image/jpeg', 1.0);

        //creates PDF from img
        var doc = new jsPDF('landscape');
        doc.setFontSize(20);
        doc.text(15, 15, 'Super Cool Chart');
        doc.addImage(newCanvasImg, 'JPEG', 10, 10, 280, 150);
        doc.save('new-canvas.pdf');
    }
}
