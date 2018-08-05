import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {JsonpModule, Jsonp, Response} from '@angular/http';
import { environment } from './../environments/environment';
import { FormsModule} from '@angular/forms';
import {ChartModule} from 'primeng/chart';
import { RouterModule, Routes } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { SearchComponent } from './Components/search/search.component';
import { StatsComponent } from './Components/stats/stats.component';
import { MainComponent } from './Components/main/main.component';
import { FAQComponent } from './Components/faq/faq.component';
import { UserStatComponent } from './Components/user-stat/user-stat.component';
import { GameStatsComponent } from './Components/game-stats/game-stats.component';
import { GameStatsDetailComponent } from './Components/game-stats-detail/game-stats-detail.component';
import { AutofocusDirective } from './autofocus.directive';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/home',pathMatch: 'full'},
  { path: 'home', component: MainComponent },
  { path: 'FAQ', component: FAQComponent },
  { path: 'mystats', component: UserStatComponent},
  { path: 'gamestats', component: GameStatsComponent},
  { path: 'gamestats/:appid', component: GameStatsDetailComponent},
  { path: '404', component: PageNotFoundComponent},
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SearchComponent,
    StatsComponent,
    MainComponent,
    FAQComponent,
    UserStatComponent,
    GameStatsComponent,
    GameStatsDetailComponent,
    AutofocusDirective,
    PageNotFoundComponent
  ],
  imports: [
    JsonpModule,
    BrowserModule,
    HttpClientModule,
    HttpClientModule,
    FormsModule,
    ChartModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
