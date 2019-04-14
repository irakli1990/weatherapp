import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';
import { LoginModalService, AccountService, Account } from 'app/core';
import { JhiAlertService } from 'ng-jhipster';
import { HomeService } from 'app/home/home.service';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: ['home.css']
})
export class HomeComponent implements OnInit {
    account: Account;
    modalRef: NgbModalRef;
    lineData: any;
    barData: any;
    donatData: any;
    links: any;
    parseLinks: any;
    totalItems: any;
    weatherMain: any;
    weatherForCity: string;
    temp: any;
    tempMax: any;
    humidity: any;
    pressure: any;
    tempMin: any;
    curentDate: Date;
    randomtemp: any;
    randomtempMax: any;
    randomtempMin: any;
    randomCity: string;

    constructor(
        private accountService: AccountService,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager,
        private alertService: JhiAlertService,
        private homeService: HomeService
    ) {
        this.barData = {
            labels: [this.getDate()],
            datasets: [
                {
                    label: 'temperatura',
                    backgroundColor: '#42A5F5',
                    borderColor: '#1E88E5',
                    data: this.temp
                },
                {
                    label: 'Minimalna temperatura',
                    backgroundColor: '#9CCC65',
                    borderColor: '#7CB342',
                    data: this.tempMin
                },
                {
                    label: 'Maximalna temperatura',
                    backgroundColor: '#9eee65',
                    borderColor: '#7CB342',
                    data: this.tempMax
                }
            ]
        };
        this.lineData = {
            labels: [this.curentDate],
            datasets: [
                {
                    label: 'First Dataset',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    borderColor: '#4bc0c0'
                },
                {
                    label: 'Second Dataset',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    borderColor: '#565656'
                }
            ]
        };
        this.donatData = {
            labels: ['Temperatura', 'Temperatura Minimalna', 'Temperatura maximalna'],
            datasets: [
                {
                    data: [this.temp, this.tempMin, this.tempMax],
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                    hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
                }
            ]
        };
        setInterval(() => {
            this.randomCityGenerator();
        }, 5000);
    }

    ngOnInit() {
        this.accountService.identity().then((account: Account) => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', message => {
            this.accountService.identity().then(account => {
                this.account = account;
            });
        });
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
                this.temp = res.body.temp;
                this.tempMax = res.body.tempMax;
                this.tempMin = res.body.tempMin;

                console.log(this.tempMin, this.tempMax, this.temp);
            },
            error => (this.weatherMain = <any>error)
        );
    }

    findRandomCityWeather(city: string) {
        this.homeService.find(city).subscribe(
            res => {
                this.randomtemp = res.body.temp;
                this.randomtempMax = res.body.tempMax;
                this.randomtempMin = res.body.tempMin;

                console.log(this.tempMin, this.tempMax, this.temp);
            },
            error => (this.weatherMain = <any>error)
        );
    }

    randomCityGenerator() {
        const cityArray = [
            'Katowice',
            'Tbilisi',
            'Paris',
            'Moskow',
            'Washington',
            'Tokyo',
            'Praga',
            'Budapesht',
            'Zagreb',
            'Kutaisi',
            'Kiev',
            'Bratislava'
        ];

        for (let i = 0; i < cityArray.length; i++) {
            const randomIndex = Math.floor(Math.random() * cityArray.length);
            this.randomCity = cityArray[randomIndex];
        }
        this.findRandomCityWeather(this.randomCity);
    }

    getDate() {
        const d = new Date();
        d.setDate(d.getDate());
        return d.toLocaleDateString();
    }
}
