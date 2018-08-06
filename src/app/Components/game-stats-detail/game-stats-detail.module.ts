import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameStatsDetailRoutingModule } from './game-stats-detail-routing.module';
import { GameStatsDetailComponent } from './game-stats-detail.component';
import {ChartModule} from 'primeng/chart';

@NgModule({
  imports: [
    CommonModule,
    GameStatsDetailRoutingModule,
    ChartModule
  ],
  declarations: [GameStatsDetailComponent]
})
export class GameStatsDetailModule { }
