import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GameStatsComponent } from './game-stats.component';


const routes: Routes = [
  { path: '', component: GameStatsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameStatsRoutingModule { }
