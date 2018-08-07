import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { DatabaseService } from '../../Services/database.service';
import { APIService } from '../../Services/api.service';
import { Title } from '@angular/platform-browser';

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
  errors: string;
  twentyFourHourPeak: number;
  playerCount:number[] =  [];
  playerCountTime:Date[] = [];
  currentPlayerGraphTimeTab: number; //0 = 24 hour, 1 = 7 day, 2 = 1 month, 3 = 1 year, 4 = all time
  earliestPlayerCountDayDiff: number;

  constructor( private route : ActivatedRoute, private databaseService: DatabaseService, private apiService: APIService, private titleService:Title ) { }

  ngOnInit() {
    this.twentyFourHourPeak = 0;
    this.currentPlayerGraphTimeTab = 4;
    this.getDetails();
  }

  getDetails(){
    this.route.params.subscribe(params => {
      this.gameAppID = params.appid;
      this.callDetails(this.gameAppID);
      this.steamDetails(this.gameAppID);
    });
  }

  setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }

  steamDetails(gameID){
    this.apiService.getSteamDetails(gameID).subscribe( data => {
      if(data[gameID]['success']==true){
        this.backgroundURL = data[gameID]['data']['background'];
        this.getBackgroundURL();
        this.steamData = data[gameID]['data'];
      }
      else{
        this.errors = " Cannot retrieve Steam details";
      }
    });
  }

  callDetails(gameID){
    this.databaseService.getGameDetail(gameID).subscribe( data => {
      this.data = data;
      this.setTitle("Steam Check - " + this.data['name']);
      for(let i=0; i<this.data['player_count'].length; i++){
        this.playerCount.push(this.data['player_count'][i].player_count);
        let playerCountDate = new Date(this.data['player_count'][i].time);
        this.playerCountTime.push(playerCountDate);

        if(this.isLastTwentyFourHour(playerCountDate)){
          if(this.twentyFourHourPeak < this.data['player_count'][i].player_count){
            this.twentyFourHourPeak = this.data['player_count'][i].player_count; //check for last 24 hour player peak count
          }
        }
      }

      this.earliestPlayerCountDayDiff = this.earliestDate();

      this.createPlayerGraph(this.earliestPlayerCountDayDiff);
    });
  }

  changePlayerGraph(pastNDays){
    this.playerCount=[];
    this.playerCountTime=[];
    for(let i=0; i<this.data['player_count'].length; i++){
      let playerCountDate = new Date(this.data['player_count'][i].time);
      if(this.isWithinNdays(playerCountDate, pastNDays)){
        this.playerCount.push(this.data['player_count'][i].player_count);
        this.playerCountTime.push(playerCountDate);
      }
    }
    this.createPlayerGraph(pastNDays);
  }

  createPlayerGraph(pastNDays){
    if(pastNDays > this.earliestPlayerCountDayDiff){
      pastNDays = this.earliestPlayerCountDayDiff;
    }
    this.playerStats = {
      labels: this.playerCountTime,
      datasets: [
        {
          label: 'Amount of Players',
          data: this.playerCount,
          fill: false,
          borderColor: '#ff0000'
        }
      ]
    };

    this.playerStatsOptions = {
      title: {
          display: true,
          text: 'Player Count'
      },

      elements: { point: { radius: 0 } },

      legend: {display: false},

      tooltips: {
        callbacks: {
          title: function(tooltipItem, data) {
            let str = tooltipItem[0].xLabel;
            let playerDate = new Date(str);

            let dayInWords = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            let monthInWords = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

            let date = playerDate.getDate();
            let day = playerDate.getDay();
            let month = playerDate.getMonth();
            let year = playerDate.getFullYear();
            let hour = playerDate.getHours();
            let minute = playerDate.getMinutes();

            let returnString = dayInWords[day] + " " + monthInWords[month] + " " + date + ", " + year + " ";
            var isAM = true;
            if(hour == 0){
              hour = 12;
            }
            else if(hour < 10){
              returnString += "0";
            }
            else if(hour > 12){
              hour = hour - 12;
              isAM = false;
            }
            returnString += hour + ":";
            if(minute<10){
              returnString += "0";
            }
            returnString += "" + minute;
            if(isAM){
              returnString += " AM";
            }
            else{
              returnString += " PM";
            }

            return returnString;
          },
          label:function(tooltipItem, data){
            let str = tooltipItem.yLabel;
            let returnString = str.toLocaleString(undefined);
            return "Amount of Players: " + returnString;
          }
        },
        mode: 'index',
        intersect: false
      },

      hover: {
         mode: 'index',
         intersect: false
      },

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
            unit: this.playerGraphDateUnit(pastNDays),
            displayFormats: {
              'day': 'MMM DD',
              'month': 'MMM YYYY',
              'hour': 'h:mm a'
            },
            tooltipFormat: "YYYY-MM-DDTHH:mm:ss.sssZ",
            min: this.lastNDayDate(pastNDays)
          },
          ticks: {
              fontColor: 'black'
          },
        }]
      }
    };
  }

  isWithinNdays(date, pastNDays){
    var ONE_DAY = 24*60*60*1000; // hour * minute * seconds * millisecond
    return ((Date.now() - date) < pastNDays * ONE_DAY);
  }

  earliestDate(){
    var today = new Date();
    var earliestDay = new Date(this.data['player_count'][0].time);
    var timeDiff = today.getTime() - earliestDay.getTime();
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return diffDays;
  }

  playerGraphDateUnit(n){
    if(n>=120){
      return 'month';
    }
    else if(n<=1){
      return 'hour';
    }
    else{
      return 'day';
    }
  }

  lastNDayDate(n){
    var today = new Date();
    var lastNday = new Date(today.getTime() - n * 24 * 60 * 60 * 1000);
    return lastNday.toISOString();
  }

  isLastTwentyFourHour(date){
    var ONE_DAY = 24*60*60*1000; // hour * minute * seconds * millisecond
    return ((Date.now() - date) < ONE_DAY);
  }

  getBackgroundURL(){
    var gameStatDetailComponent = this;
    this.verifyBackgroundURL(function(data){
      if(data){
        gameStatDetailComponent.backgroundURL = "url(" + gameStatDetailComponent.backgroundURL + ")";
      }
      else{
        gameStatDetailComponent.backgroundURL = "url(/assets/background.jpg)";
      }
    });
  }

  verifyBackgroundURL(callback){
    var bgImg = new Image();
    bgImg.onload = function(){
      callback(true);
    }
    bgImg.onerror = function(){
      callback(false);
    }
    bgImg.src = this.backgroundURL;
  }

}
