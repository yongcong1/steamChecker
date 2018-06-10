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

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SearchComponent,
    StatsComponent
  ],
  imports: [
    JsonpModule,
    BrowserModule,
    HttpClientModule,
    HttpClientModule,
    FormsModule,
    ChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
