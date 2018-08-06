import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import {ChartModule} from 'primeng/chart';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { SearchComponent} from '../search/search.component';
import { StatsComponent} from '../stats/stats.component';

@NgModule({
  imports: [
    CommonModule,
    MainRoutingModule,
    FormsModule,
    ChartModule
  ],
  declarations: [
    MainComponent,
    SearchComponent,
    StatsComponent
  ]
})
export class MainModule { }
