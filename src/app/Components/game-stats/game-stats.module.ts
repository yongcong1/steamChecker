import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameStatsRoutingModule } from './game-stats-routing.module';
import { GameStatsComponent } from './game-stats.component';
import { FormsModule} from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    GameStatsRoutingModule,
    FormsModule
  ],
  declarations: [GameStatsComponent]
})
export class GameStatsModule { }
