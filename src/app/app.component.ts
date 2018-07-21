import { Component, ViewChild } from '@angular/core';
import { DisplayService } from './Services/display.service';
import { APIService } from './Services/api.service';
import { DatabaseService } from './Services/database.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [ APIService, DisplayService, DatabaseService ],
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor() {
  }

  ngOnInit() {
  }
}
