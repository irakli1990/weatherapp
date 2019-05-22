import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {RouterModule} from '@angular/router';
import {InputTextModule} from 'primeng/inputtext';
import {WetherappSharedModule} from 'app/shared';
import {HOME_ROUTE, HomeComponent} from './';
import {HttpClientModule} from '@angular/common/http';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ChartsModule} from 'ng2-charts';

@NgModule({
    imports: [WetherappSharedModule, MatButtonModule, MatInputModule, InputTextModule, ChartsModule, BrowserAnimationsModule, HttpClientModule, ButtonModule, RouterModule.forChild([HOME_ROUTE])],
    declarations: [HomeComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WetherappHomeModule {
}
