import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HistoryComponent} from './history.component';
import {RouterModule} from '@angular/router';
import {HISTORY_ROUTE} from "app/history/history.route";
import { ChartsModule } from 'ng2-charts';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
    declarations: [HistoryComponent],
    imports: [
        CommonModule,
        ChartsModule,
        MatButtonModule,
        MatIconModule,
        RouterModule.forChild([HISTORY_ROUTE])

    ]
})
export class HistoryModule {
}
