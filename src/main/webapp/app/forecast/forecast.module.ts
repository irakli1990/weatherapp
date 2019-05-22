import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {FORECAST_ROUTE,ForecastComponent} from './index';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { ChartsModule } from 'ng2-charts';
import {MatIconModule} from '@angular/material/icon';



@NgModule({
    declarations: [ForecastComponent],
    imports: [
        CommonModule,
        ChartsModule,
        FormsModule,
        MatButtonModule,
        MatInputModule,
        MatIconModule,
        RouterModule.forChild([FORECAST_ROUTE])
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ForecastModule {
}
