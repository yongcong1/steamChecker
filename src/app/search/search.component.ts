import { Component, AfterViewInit } from '@angular/core';
import { DisplayService } from '../display.service';
import { trigger,state,style,transition,animate,keyframes,group } from '@angular/animations';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  animations: [
    trigger('flyFromLeft', [
      state('in', style({transform: 'translateX(0)'})),
      transition('void => *', [
        animate(1000, keyframes([
          style({opacity: 0, transform: 'translateX(-100%)', offset: 0}),
          style({opacity: 0, transform: 'translateX(-100%)', offset: 0.5}),
          style({opacity: 1, transform: 'translateX(0)',     offset: 1})
        ]))
      ]),
    ]),

    trigger('flyFromRight', [
      state('in', style({transform: 'translateX(0)'})),
      transition('void => *', [
        animate(1000, keyframes([
          style({opacity: 0, transform: 'translateX(100%)', offset: 0}),
          style({opacity: 0, transform: 'translateX(100%)', offset: 0.5}),
          style({opacity: 1, transform: 'translateX(0)',     offset: 1.0})
        ]))
      ])
    ]),

    trigger('title', [
      state('in', style({width: '*', overflow: 'hidden'})),
      transition('void => *', [
        style({width: 0, overflow: 'hidden'}),
        animate(500, style({width: '*', overflow: 'hidden'}))
      ])
    ])
  ]
})
export class SearchComponent implements AfterViewInit {

  currentState = "inactive";
  title = 'Check Your Steam Stats';

  constructor(private displayService:DisplayService) {
   }

  ngAfterViewInit() {
    this.currentState = "active";
    console.log(this.currentState);
  }

  searchCustom(customID){
    this.displayService.setCustomID(customID);
  }

  search(steam64ID){
    this.displayService.showStats(steam64ID);
  }

}
