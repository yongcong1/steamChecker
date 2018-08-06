import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { NavbarComponent } from './Components/navbar/navbar.component';
import { AutofocusDirective } from './Directives/autofocus.directive';

/*const appRoutes: Routes = [
  { path: '', redirectTo: '/home',pathMatch: 'full'},
  { path: 'home', component: MainComponent },
  { path: 'FAQ', component: FAQComponent },
  { path: 'mystats', component: UserStatComponent},
  { path: 'gamestats', component: GameStatsComponent},
  { path: 'gamestats/:appid', component: GameStatsDetailComponent},
  { path: '404', component: PageNotFoundComponent},
  { path: '**', redirectTo: '/404' }
];*/

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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
