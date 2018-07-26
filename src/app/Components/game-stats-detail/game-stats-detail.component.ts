import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { DatabaseService } from '../../Services/database.service';
import { APIService } from '../../Services/api.service';

@Component({
  selector: 'app-game-stats-detail',
  templateUrl: './game-stats-detail.component.html',
  styleUrls: ['./game-stats-detail.component.css']
})
export class GameStatsDetailComponent implements OnInit {

  data: any;
  gameAppID: number;
  steamData: any;
  backgroundURL: string;
  playerStats: any;
  playerStatsOptions: any;

  constructor( private route : ActivatedRoute, private databaseService: DatabaseService, private apiService: APIService ) { }

  ngOnInit() {
    this.getDetails();
  }

  getDetails(){
    this.route.params.subscribe(params => {
      this.gameAppID = params.appid;
      this.callDetails(this.gameAppID);
      this.steamDetails(this.gameAppID);
    });
  }

  callDetails(gameID){
    this.databaseService.getGameDetail(gameID).subscribe( data => {
      this.data = data;
      console.log(this.data);
      let playerCount:number[] =  [];
      let playerCountTime: Date[] = [];
      for(let i=0; i<this.data['player_count'].length; i++){
        playerCount.push(this.data['player_count'][i].player_count);
        let playerCountDate = new Date(this.data['player_count'][i].time);
        playerCountTime.push(playerCountDate);
      }
      console.log(playerCount);
      console.log(playerCountTime);
      this.playerStats = {
        labels: playerCountTime,
        datasets: [
          {
            label: 'Amount of Players',
            data: playerCount,
            fill: false,
            borderColor: '#ff0000'
          }
        ]
      }

      this.playerStatsOptions = {
        legend: {display: false},
        scales: {
          yAxes: [{
              ticks: {
                  beginAtZero: true,
                  fontColor: 'black',
                  callback: function(value, index, values) {
                    let number = value;
                    let returnString = "";
                    let amountOfOneThousand = 0;
                    while(number>=1000){
                      number = number / 1000;
                      amountOfOneThousand++;
                    }
                    switch(amountOfOneThousand){
                      case 1: return "" + number + "K";
                      case 2: return "" + number + "M";
                      case 3: return "" + number + "B";
                      case 4: return "" + number + "T";
                      default: return number;
                    }
                }
              },
          }],
        xAxes: [{
          type: 'time',
          time: {
              unit: 'day',
              displayFormats: {
                'millisecond': 'MMM DD',
                'second': 'MMM DD',
                'minute': 'MMM DD',
                'hour': 'MMM DD',
                'day': 'MMM DD',
                'week': 'MMM DD',
                'month': 'MMM DD',
                'quarter': 'MMM DD',
                'year': 'MMM DD',
              }
          },
          ticks: {
              fontColor: 'black'
          },
        }]
      }}
    });
  }

  getBackgroundURL(){
    return "url(" + this.backgroundURL + ")";
  }

  steamDetails(gameID){
    this.apiService.getSteamDetails(gameID).subscribe( data => {
      console.log(data[gameID]);
      if(data[gameID]['success']==true){
        this.backgroundURL = data[gameID]['data']['background'];
        this.steamData = data[gameID]['data'];
        this.steamData['about_the_game'] = this.steamData['about_the_game'].replace(/(<([^>]+)>)/ig," "); //remove html tags from steam store api
      }
    })
  }

  getPublishers(){
    let returnString = "";
    for(let i=0; i<this.steamData['publishers'].length; i++){
      if(i>0){
        returnString = returnString + ", " + this.steamData['publishers'][i];
      }
      else{
        returnString = this.steamData['publishers'][i];
      }
    }
    return returnString;
  }

  getDevelopers(){
    let returnString = "";
    for(let i=0; i<this.steamData['developers'].length; i++){
      if(i>0){
        returnString = returnString + ", " + this.steamData['developers'][i];
      }
      else{
        returnString = this.steamData['developers'][i];
      }
    }
    return returnString;

  }

}
