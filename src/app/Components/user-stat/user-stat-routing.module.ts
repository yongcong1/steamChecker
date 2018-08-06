import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserStatComponent } from './user-stat.component';


const routes: Routes = [
  { path: '', component: UserStatComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserStatRoutingModule { }
