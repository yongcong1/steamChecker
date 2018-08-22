import { Component, OnInit } from '@angular/core';
import { APIService } from '../../Services/api.service';
import { DatabaseService } from '../../Services/database.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-game-stats',
  templateUrl: './game-stats.component.html',
  styleUrls: ['./game-stats.component.css']
})
export class GameStatsComponent implements OnInit {
  data: any; //holds the data queried from database
  searchData: any; //main data list to display
  displayGameList: any[] = []; //games data on pages
  pageSize: number;
  currentPage: number;
  lastPage: number;
  pages: number[] = [];
  totalGames: number;
  beginResult: number;
  endResult: number;
  currentPlayerCount: number;
  appidSortOrder: number;
  nameSortOrder: number;
  playerCountSortOrder: number;
  maxPlayerCountSortOrder: number;

  constructor(private apiService: APIService, private databaseService: DatabaseService, private titleService:Title) { }

  ngOnInit() {
    this.currentPage = 1;
    this.pageSize = 10;
    this.appidSortOrder = 1;
    this.nameSortOrder = 1;
    this.playerCountSortOrder = -1;
    this.maxPlayerCountSortOrder = -1;
    this.showGameList();
    this.setTitle("Steam Check - Explore Steam Game Statistics");
  }

  setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }

  showGameList(){
    this.databaseService.getGameList().subscribe(data => {
      this.data = data;
      this.data.sort((t1,t2) => {
        if(!t1.current_player && !t2.current_player) return 0;
        else if(!t1.current_player) return 1;
        else if(!t2.current_player) return -1;
        if(t1.current_player  > t2.current_player ) return -1;
        if(t1.current_player  < t2.current_player ) return 1;
        return 0;
      });
      this.searchData = data;
      this.refreshGameList();
    });
  }

  sortAppid(sortOrder){
    //-1 reverse sort
    //1 regular sort
    this.appidSortOrder *= -1;
    this.searchData.sort((t1,t2) => {
      if(t1.appid > t2.appid) return sortOrder*-1;
      if(t1.appid < t2.appid) return sortOrder;
      return 0;
    });
    this.setPage(1);
  }

  sortName(sortOrder){
    //-1 reverse sort
    //1 regular sort
    this.nameSortOrder *= -1;
    this.searchData.sort((t1,t2) => {
      if(t1.name > t2.name) return sortOrder*-1;
      if(t1.name < t2.name) return sortOrder;
      return 0;
    });
    this.setPage(1);
  }

  sortPlayerCount(sortOrder){
    //-1 reverse sort
    //1 regular sort
    this.playerCountSortOrder *= -1;
    this.searchData.sort((t1,t2) => {
    if(!t1.current_player && !t2.current_player) return 0;
    else if(!t1.current_player) return sortOrder;
    else if(!t2.current_player) return -1*sortOrder;
    if(t1.current_player > t2.current_player) return -1*sortOrder;
    if(t1.current_player < t2.current_player) return sortOrder;
    return 0;
    });
    this.setPage(1);
  }

  sortMaxPlayerCount(sortOrder){
    //-1 reverse sort
    //1 regular sort
    this.maxPlayerCountSortOrder *= -1;
    this.searchData.sort((t1,t2) => {
    if(t1.max_player_count > t2.max_player_count) return -1*sortOrder;
    if(t1.max_player_count < t2.max_player_count) return sortOrder;
    return 0;
    });
    this.setPage(1);
  }

  searchGameList(searchString){
    if(searchString==="") this.searchData = this.data;
    else{
      this.searchData = [];
      for(let i=0; i<this.data.length; i++){
        if(this.data[i].name.toUpperCase().includes(searchString.toUpperCase())){
          this.searchData.push(this.data[i]);
        }
      }
    }
    this.setPage(1);
  }

  refreshGameList(){
    this.totalGames = this.searchData.length;
    this.displayGameList = [];
    let pageMax = (this.currentPage-1)*this.pageSize+this.pageSize;
    let pageMin = (this.currentPage-1)*this.pageSize;
    this.beginResult = pageMin;
    if(pageMax<this.searchData.length){
      for(let i=pageMin; i<pageMax; i++){
        this.displayGameList.push(this.searchData[i]);
      }
      this.endResult = pageMax;
    }
    else{
      for(let i=pageMin; i<this.searchData.length; i++){
        this.displayGameList.push(this.searchData[i]);
      }
      this.endResult = this.searchData.length;
    }
    this.refreshPageList();
  }

  refreshPageList(){
    this.pages = [];
    for(let i=0; i<Math.ceil(this.searchData.length/this.pageSize); i++){
      this.pages.push(i+1);
    }
    this.lastPage = this.pages.length;
  }

  setPage(pageNumber){
    if(!isNaN(pageNumber) && Number(pageNumber)){
      if(pageNumber <= 0) this.currentPage = 1;
      else if(pageNumber > this.lastPage) this.currentPage = this.lastPage;
      else this.currentPage = pageNumber;
    }
    else{
      this.currentPage = 1;
    }
    this.refreshGameList();
  }

  previousPage(){
    this.setPage(this.currentPage-1);
  }

  nextPage(){
    this.setPage(Number(this.currentPage)+1);
  }

  newPageSize(pageSize){
    this.pageSize = pageSize;
    this.setPage(1);
  }

  submitPage(pageNumber, event:Event){
    event.preventDefault();
    this.setPage(pageNumber);
  }
}
