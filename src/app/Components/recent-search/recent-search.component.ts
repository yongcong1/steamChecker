import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../Services/database.service';
import { DisplayService } from '../../Services/display.service';

@Component({
  selector: 'app-recent-search',
  templateUrl: './recent-search.component.html',
  styleUrls: ['./recent-search.component.css']
})
export class RecentSearchComponent implements OnInit {

  recentSearch:any[] = [];

  constructor( private databaseService:DatabaseService, private displayService:DisplayService ) { }

  ngOnInit() {
    this.getRecentSearch();
  }

  getRecentSearch(){
    this.databaseService.getRecentUserDetail().subscribe(data=>{
      for(let user in data){
        this.recentSearch.push(data[user]);
      }
      console.log(this.recentSearch);
    });
  }

  searchUser(steam64ID){
    this.displayService.setCustomID(steam64ID);
    this.displayService.showStats(true);
  }

}
