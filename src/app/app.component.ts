import { Component, ViewChild } from '@angular/core';
import { DisplayService } from './display.service';
import { APIService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [ APIService, DisplayService ],
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor() {
  }

  ngOnInit() {
  }
}
