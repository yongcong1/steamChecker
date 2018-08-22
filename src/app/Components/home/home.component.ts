import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DatabaseService } from '../../Services/database.service';
import { DisplayService } from '../../Services/display.service';
import { trigger,state,style,transition,animate,keyframes,group } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('fadeIn', [
      state('in', style({opacity:1})),
      transition('void => *', [
        animate('4100ms', keyframes([
            style({opacity: 0, offset: 0}),
            style({opacity: 0, offset: 0.7}),
            style({opacity: 0.25, offset: 0.75}),
            style({opacity: 0.5, offset: 0.8}),
            style({opacity: 0.75, offset: 0.85}),
            style({opacity: 1, offset: 0.9}),
        ]))
      ]),
    ]),
  ]
})
export class HomeComponent implements OnInit {
  searching = false;

  constructor( private titleService: Title, private displayService:DisplayService ) { this.setTitle("Steam Check - Explore Your Stats")}

  ngOnInit() {
    this.displayService.showStats$.subscribe(
      data => {
        this.searching = data;
      }
    );
  }

  setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }

}
