import {Component, OnInit} from '@angular/core';
import {ChartDataSets, ChartOptions} from 'chart.js';
import {Color, BaseChartDirective} from 'ng2-charts';
import {Label} from 'ng2-charts';


@Component({
    selector: 'jhi-statistics',
    templateUrl: './statistics.component.html',
    styles: []
})
export class StatisticsComponent implements OnInit {
    private chart: any;

    constructor() {
    }

    ngOnInit() {
        setInterval(() => {
            console.log(this.randomTemp());
        }, 1500);
    }


    public lineChartLegend = true;
    public lineChartType = 'line';
    public lineChartData: ChartDataSets[] = [{data: [], label: 'Series A'}, {data: [], label: 'Series B'}];
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

}
