import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserStatRoutingModule } from './user-stat-routing.module';
import { UserStatComponent } from './user-stat.component';
import { StatsModule } from '../stats/stats.module';

@NgModule({
  imports: [
    CommonModule,
    UserStatRoutingModule,
    StatsModule
  ],
  declarations: [
    UserStatComponent,
  ]
})
export class UserStatModule { }
