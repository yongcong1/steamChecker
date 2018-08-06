import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserStatRoutingModule } from './user-stat-routing.module';
import { UserStatComponent } from './user-stat.component';

@NgModule({
  imports: [
    CommonModule,
    UserStatRoutingModule
  ],
  declarations: [UserStatComponent]
})
export class UserStatModule { }
