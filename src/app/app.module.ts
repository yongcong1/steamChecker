import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ConfigComponent } from './config/config.component';
import {JsonpModule, Jsonp, Response} from '@angular/http';
import { environment } from './../environments/environment';
import { FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ConfigComponent
  ],
  imports: [
    JsonpModule,
    BrowserModule,
    HttpClientModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  
}
