import { Component, OnInit } from '@angular/core';
import { APIService } from '../api.service';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-game-stats',
  templateUrl: './game-stats.component.html',
  styleUrls: ['./game-stats.component.css']
})
export class GameStatsComponent implements OnInit {
  data: any;
  searchData: any;
  displayGameList: any[] = [];
  pageSize: number;
  currentPage: number;
  lastPage: number;
  pages: number[] = [];
  totalGames: number;
  beginResult: number;
  endResult: number;

  constructor(private apiService: APIService, private databaseService: DatabaseService) { }

  ngOnInit() {
    this.currentPage = 1;
    this.pageSize = 10;
    this.showGameList();
  }

  showGameList(){
    this.databaseService.getGameList().subscribe(data => {
      this.data = data;
      this.data.sort((t1,t2) => {
        if(t1.player_count > t2.player_count) return -1;
        if(t1.player_count < t2.player_count) return 1;
        return 0;
      });
      this.searchData = data;
      this.refreshGameList();
      this.refreshPageList();
    });
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
    console.log(this.searchData);
    this.currentPage = 1;
    this.refreshGameList();
    this.refreshPageList();
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
  }

  refreshPageList(){
    this.pages = [];
    for(let i=0; i<=Math.floor(this.searchData.length/this.pageSize); i++){
      this.pages.push(i+1);
    }
    this.lastPage = this.pages.length;
  }

  setPage(pageNumber){
    if(!isNaN(pageNumber) && Number(pageNumber)){
      if(pageNumber <= 0) this.currentPage = 1;
      else if(pageNumber > this.lastPage) this.currentPage = this.lastPage;
      else this.currentPage = pageNumber;
      this.refreshGameList();
    }
    else{
      this.currentPage = 1;
    }
  }

  previousPage(){
    this.currentPage--;
    if(this.currentPage<=0) this.currentPage = 1;
    this.refreshGameList();
  }

  nextPage(){
    this.currentPage++;
    if(this.currentPage>this.lastPage) this.currentPage = this.lastPage;
    this.refreshGameList();
  }

  newPageSize(pageSize){
    this.pageSize = pageSize;
    this.currentPage = 1;
    this.refreshGameList();
    this.refreshPageList();
  }
}
