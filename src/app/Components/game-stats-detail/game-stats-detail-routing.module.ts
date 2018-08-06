import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GameStatsDetailComponent } from './game-stats-detail.component';


const routes: Routes = [
  { path: '', component: GameStatsDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameStatsDetailRoutingModule { }
