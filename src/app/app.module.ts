import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ConfigComponent } from './config/config.component';
import {JsonpModule, Jsonp, Response} from '@angular/http';

@NgModule({
  declarations: [
    AppComponent,
    ConfigComponent
  ],
  imports: [
    JsonpModule,
    BrowserModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
