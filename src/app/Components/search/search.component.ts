import { Component, AfterViewInit, OnInit,ViewChild, Renderer2 } from '@angular/core';
import { DisplayService } from '../../Services/display.service';
import { trigger,state,style,transition,animate,keyframes,group } from '@angular/animations';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  animations: [
    trigger('dropdown0', [
      state('in', style({transform: 'translateY(0)'})),
      transition('void => *', [
        animate(300, keyframes([
          style({opacity: 0, transform: 'translateY(-100%)', offset: 0}),
          style({opacity: 0, transform: 'translateY(-100%)', offset: 0}),
          style({opacity: 1, transform: 'translateY(30px)',  offset: 0.5}),
          style({opacity: 1, transform: 'translateY(0)',     offset: 1.0})
        ]))
      ])
    ]),

    trigger('dropdown1', [
      state('in', style({transform: 'translateY(0)'})),
      transition('void => *', [
        animate(600, keyframes([
          style({opacity: 0, transform: 'translateY(-100%)', offset: 0}),
          style({opacity: 0, transform: 'translateY(-100%)', offset: 0.5}),
          style({opacity: 1, transform: 'translateY(30px)',  offset: 0.75}),
          style({opacity: 1, transform: 'translateY(0)',     offset: 1.0})
        ]))
      ])
    ]),

    trigger('dropdown2', [
      state('in', style({transform: 'translateY(0)'})),
      transition('void => *', [
        animate(900, keyframes([
          style({opacity: 0, transform: 'translateY(-100%)', offset: 0}),
          style({opacity: 0, transform: 'translateY(-100%)', offset: 0.66}),
          style({opacity: 1, transform: 'translateY(30px)',  offset: 0.83}),
          style({opacity: 1, transform: 'translateY(0)',     offset: 1.0})
        ]))
      ])
    ]),

    trigger('dropdown3', [
      state('in', style({transform: 'translateY(0)'})),
      transition('void => *', [
        animate(1200, keyframes([
          style({opacity: 0, transform: 'translateY(-100%)', offset: 0}),
          style({opacity: 0, transform: 'translateY(-100%)', offset: 0.75}),
          style({opacity: 1, transform: 'translateY(30px)',  offset: 0.875}),
          style({opacity: 1, transform: 'translateY(0)',     offset: 1.0})
        ]))
      ])
    ]),

    trigger('flyFromLeft', [
      state('in', style({transform: 'translateX(0)'})),
      transition('void => *', [
        animate(1800, keyframes([
          style({opacity: 0, transform: 'translateX(-100%)', offset: 0}),
          style({opacity: 0, transform: 'translateX(-100%)', offset: 0.66}),
          style({opacity: 1, transform: 'translateX(0)',     offset: 1})
        ]))
      ]),
    ]),

    trigger('flyFromRight', [
      state('in', style({transform: 'translateX(0)'})),
      transition('void => *', [
        animate(1800, keyframes([
          style({opacity: 0, transform: 'translateX(100%)', offset: 0}),
          style({opacity: 0, transform: 'translateX(100%)', offset: 0.66}),
          style({opacity: 1, transform: 'translateX(0)',     offset: 1.0})
        ]))
      ])
    ])
  ]
})
export class SearchComponent implements AfterViewInit {

  title = 'Check Your Steam Stats';
  userSearchText = '';
  title_array = this.title.split(" ");

  constructor(private displayService:DisplayService, private renderer: Renderer2) {
    this.displayService.showStats(false);
   }

   ngOnInit(){
   }

  ngAfterViewInit() {
  }

  //Search bar form input
  searchCustom(){
    this.displayService.setCustomID(this.userSearchText);
    this.userSearchText="";
    this.renderer.selectRootElement('#search-text').blur();
    this.displayService.showStats(true);
  }

  //navbar login ID
  search(steam64ID){
    this.displayService.steamID(steam64ID);
  }

}
