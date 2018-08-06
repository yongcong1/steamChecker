import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameStatsRoutingModule } from './game-stats-routing.module';
import { GameStatsComponent } from './game-stats.component';

@NgModule({
  imports: [
    CommonModule,
    GameStatsRoutingModule
  ],
  declarations: [GameStatsComponent]
})
export class GameStatsModule { }
