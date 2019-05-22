import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticsComponent } from './statistics.component';
import { RouterModule } from '@angular/router';
import {STAT_ROUTE} from "app/statistics/statistics.route";
import { ChartsModule } from 'ng2-charts';



@NgModule({
  declarations: [StatisticsComponent],
  imports: [
    CommonModule,
      ChartsModule,
      RouterModule.forChild([STAT_ROUTE])
  ]
})
export class StatisticsModule { }
