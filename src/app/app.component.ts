import { Component, ViewChild } from '@angular/core';
import { UserSummary, ConfigService } from './config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [ ConfigService ],
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Check Your Steam Stats';

  constructor() {
  }

  ngOnInit() {
  }
}
