import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecentSearchComponent } from './recent-search.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [  RecentSearchComponent ],
  exports: [
    RecentSearchComponent
  ]
})
export class RecentSearchModule { }
