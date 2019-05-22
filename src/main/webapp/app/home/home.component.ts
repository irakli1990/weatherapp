import {Component, ViewChild, OnInit, ElementRef} from '@angular/core';
import {NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';
import {LoginModalService, AccountService, Account} from 'app/core';
import {JhiAlertService} from 'ng-jhipster';
import {HomeService} from 'app/home/weather-main.service';
import {Chart} from 'chart.js';
import {saveAs} from 'file-saver/dist/FileSaver';
import * as jsPDF from 'jspdf';
import {ChartType} from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import {Label} from 'ng2-charts';
import * as html2canvas from 'html2canvas';
import {ChartDataSets, ChartOptions} from 'chart.js';
import {Color, BaseChartDirective} from 'ng2-charts';
import 'rxjs/add/operator/map';
import {HistoryService} from 'app/history/history.service';
import {IBrowserHistory} from "app/shared/models/history";

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: ['home.css']
})
export class HomeComponent implements OnInit {
    @ViewChild('content') content: ElementRef;
    @ViewChild('buttonElement') buttonElement: ElementRef;
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
    color = [];
    colorIterator = 0;

    ngOnInit() {
        this.accountService.identity().then((account: Account) => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();

    }


    public barChartOptions: ChartOptions = {
        responsive: true,
        // We use these empty structures as placeholders for dynamic theming.
        scales: {xAxes: [{}], yAxes: [{}]},
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
        {data: [], label: 'Temp'},
        {data: [], label: 'Temp Min'},
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
        private homeService: HomeService,
        private _historyService: HistoryService
    ) {
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', message => {
            this.accountService.identity().then(account => {
                this.account = account;
            });
        });
    }


    getDate() {
        const d = new Date();
        d.setDate(d.getDate());
       return d;
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

                let browserHistory = new IBrowserHistory();
                browserHistory.city = this.weatherForCity;
                browserHistory.pressure = this.presure.toString();
                browserHistory.humidity = this.humidity.toString();
                browserHistory.temp = this.randomtemp.toString();
                browserHistory.tempMax = this.randomtempMax.toString();
                browserHistory.searchTime = this.getDate();
                this._historyService.create(browserHistory).subscribe();
                temperature.push(this.randomtemp);
                temperatureMax.push(this.randomtempMax);
                console.log(this.weatherForCity, this.randomtemp.toString(), this.randomtempMax.toString(), this.randomtempMin.toString());
                temperatureMin.push(this.randomtempMin);
                this.barChartData[0].data = temperature;
                this.barChartData[1].data = temperatureMin;
                this.barChartData[2].data = temperatureMax;
            },
            error => (this.weatherMain = <any>error)
        );
    }

    downloadPDF2() {
        html2canvas(document.getElementById('dataforpdf')).then(function (canvas) {
            const img = canvas.toDataURL('image/png');
            const doc = new jsPDF('p', 'pt', 'a4');
            const width = doc.internal.pageSize.getWidth();
            const height = doc.internal.pageSize.getHeight();
            doc.addImage(img, 'JPEG', 0, 0, width, height);
            doc.save('testCanvas.pdf');
        });
    }

    changeColor() {
        console.log()
        this.color = ['#7080ee', '#1d4c99', '#484f49', '#bc8907'];
        this.colorIterator = this.colorIterator < this.color.length ? ++this.colorIterator : 0;
        document.querySelector("body").style.background = this.color[this.colorIterator];
        document.querySelector("html").style.background = this.color[this.colorIterator];
        document.getElementById("main").style.background = this.color[this.colorIterator];
        document.getElementById("mainConteiner").style.background = this.color[this.colorIterator];
    }
}
