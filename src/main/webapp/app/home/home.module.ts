import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { WetherappSharedModule } from 'app/shared';
import { HOME_ROUTE, HomeComponent } from './';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    imports: [WetherappSharedModule, InputTextModule, HttpClientModule, ButtonModule, RouterModule.forChild([HOME_ROUTE])],
    declarations: [HomeComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WetherappHomeModule {}
