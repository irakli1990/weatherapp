import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { WetherappSharedModule } from 'app/shared';
import { HOME_ROUTE, HomeComponent } from './';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [WetherappSharedModule, InputTextModule, FormsModule, ChartModule, ButtonModule, RouterModule.forChild([HOME_ROUTE])],
    declarations: [HomeComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WetherappHomeModule {}
