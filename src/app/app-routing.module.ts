import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/home',pathMatch: 'full'},
  { path: 'home', loadChildren: './Components/main/main.module#MainModule' },
  { path: 'FAQ', loadChildren: './Components/faq/faq.module#FAQModule' },
  { path: 'mystats', loadChildren: './Components/user-stat/user-stat.module#UserStatModule' },
  { path: 'gamestats', loadChildren: './Components/game-stats/game-stats.module#GameStatsModule' },
  { path: 'gamestats/:appid', loadChildren: './Components/game-stats-detail/game-stats-detail.module#GameStatsDetailModule' },
  { path: '404', loadChildren: './Components/page-not-found/page-not-found.module#PageNotFoundModule' },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
