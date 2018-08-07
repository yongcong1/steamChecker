import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsComponent } from './stats.component';
import { ChartModule } from 'primeng/chart';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    ChartModule,
    RouterModule
  ],
  declarations: [StatsComponent],
  exports: [
    StatsComponent
  ]
})
export class StatsModule { }
