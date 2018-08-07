import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { NavbarComponent } from './Components/navbar/navbar.component';
import { AutofocusDirective } from './Directives/autofocus.directive';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AutofocusDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [ Title ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
