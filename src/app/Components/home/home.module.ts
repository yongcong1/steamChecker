import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HomeRoutingModule } from './Home-routing.module';
import { HomeComponent } from './home.component';
import { RecentSearchModule } from '../recent-search/recent-search.module';
import { SearchModule } from '../search/search.module';
import { StatsModule } from '../stats/stats.module';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    RecentSearchModule,
    SearchModule,
    StatsModule
  ],
  declarations: [
    HomeComponent
  ]
})

export class HomeModule { }
