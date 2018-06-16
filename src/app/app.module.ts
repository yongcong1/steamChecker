import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import {JsonpModule, Jsonp, Response} from '@angular/http';
import { environment } from './../environments/environment';
import { FormsModule} from '@angular/forms';
import {ChartModule} from 'primeng/chart';
import { NavbarComponent } from './navbar/navbar.component';
import { SearchComponent } from './search/search.component';
import { StatsComponent } from './stats/stats.component';
import { MainComponent } from './main/main.component';
import { RouterModule, Routes } from '@angular/router';
import { FAQComponent } from './faq/faq.component';
import { UserStatComponent } from './user-stat/user-stat.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

const appRoutes: Routes = [
  { path: 'main', component: MainComponent },
  { path: 'FAQ', component: FAQComponent },
  { path: 'mystats', component: UserStatComponent},
  { path: '', redirectTo: '/main', pathMatch:'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SearchComponent,
    StatsComponent,
    MainComponent,
    FAQComponent,
    UserStatComponent
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
