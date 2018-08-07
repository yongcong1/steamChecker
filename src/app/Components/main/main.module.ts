import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { SearchModule} from '../search/search.module';
import { StatsModule} from '../stats/stats.module';

@NgModule({
  imports: [
    CommonModule,
    MainRoutingModule,
    StatsModule,
    SearchModule
  ],
  declarations: [
    MainComponent
  ]
})
export class MainModule { }
