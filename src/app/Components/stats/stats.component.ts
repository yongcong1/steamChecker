import { Component, OnInit } from '@angular/core';
import {ChartModule} from 'primeng/chart';
import { trigger,state,style,transition,animate,keyframes } from '@angular/animations';

import { APIService, UserSummary,  UserStats, TopGames, Friends, PrivateUserSummary } from '../../Services/api.service';
import { DisplayService } from '../../Services/display.service';
import { DatabaseService } from '../../Services/database.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css'],
  animations: [
    trigger('dropdown', [
      state('in', style({transform: 'translateY(0)'})),
      transition('void => *', [
        animate(800, keyframes([
          style({opacity: 0, transform: 'translateY(-100%)', offset: 0}),
          style({opacity: 1, transform: 'translateY(30px)',  offset: 0.3}),
          style({opacity: 1, transform: 'translateY(-15px)',  offset: 0.6}),
          style({opacity: 1, transform: 'translateY(15px)',  offset: 0.8}),
          style({opacity: 1, transform: 'translateY(0)',     offset: 1.0})
        ]))
      ])
    ]),

    trigger('generalTab', [
      state('active', style({transform: 'translateX(0)'})),
      state('inactive', style({transform: 'scale(0)'})),
      transition('* => active', [
        animate('700ms ease-out', keyframes([
            style({opacity: 0, offset: 0}),
            style({opacity: 0.25, offset: 0.2}),
            style({opacity: 0.5, offset: 0.4}),
            style({opacity: 0.75, offset: 0.6}),
            style({opacity: 1, offset: 0.8}),
        ]))
      ]),
    ]),

    trigger('gameTab', [
      state('active', style({opacity: 1})),
      state('inactive', style({opacity: 0})),
      transition('* => active', [
        animate('700ms ease-out', keyframes([
          style({opacity: 0, offset: 0}),
          style({opacity: 0.25, offset: 0.2}),
          style({opacity: 0.5, offset: 0.4}),
          style({opacity: 0.75, offset: 0.6}),
          style({opacity: 1, offset: 0.8}),
        ]))
      ]),
    ]),

    trigger('friendTab', [
      state('active', style({opacity: 1})),
      state('inactive', style({opacity: 0})),
      transition('* => active', [
        animate('700ms ease-out', keyframes([
          style({opacity: 0, offset: 0}),
          style({opacity: 0.25, offset: 0.2}),
          style({opacity: 0.5, offset: 0.4}),
          style({opacity: 0.75, offset: 0.6}),
          style({opacity: 1, offset: 0.8}),
        ]))
      ]),
    ]),
  ]
})

export class StatsComponent implements OnInit {

  topGames:TopGames[]=[];
  userSummary: UserSummary;
  privateUserSummary: PrivateUserSummary;
  userStats: UserStats;
  total_playtime: number;
  two_week_playtime: number;
  total_unplayed_games: number;
  total_games: number;
  empty_search: boolean;
  userStats_response: boolean;
  userSummary_response: boolean;
  searchCustom_response: boolean;
  gameStats: any;
  currentTab = 0;
  error: string;
  friends:Friends[]=[];
  friends_info: UserSummary[] = [];
  friend_error: string;
  searching:boolean;

  constructor(private apiService: APIService, private displayService:DisplayService, private databaseService:DatabaseService) {
    displayService.steamID$.subscribe(
      data => {
        this.search(data);
      }
    );
    displayService.customID$.subscribe(
      data =>{
        this.searchCustom(data);
      }
    );
  }

  ngOnInit() {
  }

  showTab(tab: number){
    this.currentTab = tab;
  }

  convertUnixTime(unixTime){
    var d = new Date(unixTime*1000);
    var monthInWord = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var year = d.getFullYear()+"";
    var month = Number(d.getMonth());
    var date = d.getDate()+"";
    if(date.length ==1){
      date = "0" + date;
    }
    return monthInWord[month-1] + ' ' + date + ', ' + year;
  }

  convertStatus(status){
    var output = "";
    switch(status){
      case 1: output="Online"; break;
      case 2: output="Busy"; break;
      case 3: output="Away"; break;
      case 4: output="Snooze"; break;
      case 5: output="Looking to trade"; break;
      case 6: output="Looking to play"; break;
      default: output="Offline";
    }
    return output;
  }

  newSearch(){
    this.userStats= null;
    this.userSummary=null;
    this.gameStats=null;
    this.error=null;
    this.topGames=[];
    this.empty_search = false;
    this.currentTab = 0;
    this.friends=[];
    this.friends_info=[];
    this.friend_error=null;
    this.searchCustom_response = null;
    this.searching = true;
  }

  //the api returns the steamid that belongs to the custom name/url
  searchCustom(customUrl: string){
    this.newSearch();

    if(customUrl.length==0){
      this.empty_search = true;
      this.searching = false;
      return;
    }
    if(customUrl.includes("https://steamcommunity.com/id/"))
      customUrl = customUrl.split("https://steamcommunity.com/id/")[1];
    if(customUrl.slice(-1)=="/"){
      customUrl = customUrl.substring(0, customUrl.length-1);
    }
    if(customUrl.includes("https://steamcommunity.com/profiles/")){
      customUrl = customUrl.split("https://steamcommunity.com/profiles/")[1];
      this.search(customUrl);
    }
    else{
      this.apiService.getUserSteamId(customUrl).subscribe(data => {
        data=data['response'];
        if(data['success']==1){
          this.searchCustom_response = true;
          this.search(data['steamid']);
        }
        else if(data['success']==42){
          this.search(customUrl);
        }
        else{
          this.searchCustom_response = false;
        }
      },
      error=>{
        console.log("there is an error: " + error);
        this.error = error;
      });
    }
  }

    makeGameGraphs(data){
      let gameInfo = data.response.games
      var filteredAry = gameInfo.filter(e => e.playtime_forever > 300)
      this.gameStats = {
        labels: filteredAry.map(a => a.name),
        datasets: [
          {
            data: filteredAry.map(a => a.playtime_forever),
            backgroundColor: ['#3366CC','#DC3912','#FF9900','#109618','#990099','#3B3EAC','#0099C6','#DD4477','#66AA00','#B82E2E','#316395','#994499','#22AA99','#AAAA11','#6633CC',
            '#E67300','#8B0707','#329262','#5574A6','#3B3EAC','#3366CC','#DC3912','#FF9900','#109618','#990099','#3B3EAC','#0099C6','#DD4477','#66AA00','#B82E2E','#316395','#994499',
            '#22AA99','#AAAA11','#6633CC','#E67300','#8B0707','#329262','#5574A6','#3B3EAC','#3366CC','#DC3912','#FF9900','#109618','#990099','#3B3EAC','#0099C6','#DD4477','#66AA00',
            '#B82E2E','#316395','#994499','#22AA99','#AAAA11','#6633CC','#E67300','#8B0707','#329262','#5574A6','#3B3EAC'],
          }
        ],
        options: {
          legend: {
            display: false
          }
        }
      }
    }

  //the api returns the json and is parsed for information about the user
  search(steam64id: string){
    this.newSearch();
    this.total_playtime=0;
    this.two_week_playtime=0;
    this.total_unplayed_games=0;
    this.total_games=0;

    if(steam64id.length==0){
      this.empty_search = true;
      return;
    }

    //getting User Info
    this.apiService.getUserInfo(steam64id).subscribe(data =>
    {
      if(data['response']['players'][0]){
        data = data['response']['players'][0];
        this.userSummary_response = true;
        this.userSummary = {
          avatar: data['avatarfull'],
          display_name: data['personaname'],
          profile_url: data['profileurl'],
          status: this.convertStatus(data['personastate']),
          steam64_id: data['steamid']
        }
        if(data['timecreated']){
          this.privateUserSummary = {
            time_created: data['timecreated'],
            game_extra_info: data['gameextrainfo'],
          }
        }

        this.databaseService.postUserDetail(this.userSummary).subscribe();
      }
    },
    error=>{
      console.log("there is an error: " + error);
      this.error = error;
    });

    //getting User Stats
    this.apiService.getUserStats(steam64id).subscribe(data =>
    {
      this.gameStats = data;
      if(data['response']['games']){
        this.userStats_response = true;
        this.makeGameGraphs(this.gameStats);
        var top_x_games = 3;
        for( let time of data['response']['games'] ){
          this.total_games++;
          if(time['playtime_2weeks']){
            this.two_week_playtime+= time['playtime_2weeks'];
          }
          if(time['playtime_forever']==0){
            this.total_unplayed_games++;
          }
          var topgame:TopGames = {
              most_played_game_appid: time['appid'],
              most_played_game_icon: "https://steamcdn-a.opskins.media/steamcommunity/public/images/apps/" +
              time['appid']+ "/" + time['img_icon_url']+".jpg",
              most_played_game_logo: "https://steamcdn-a.opskins.media/steamcommunity/public/images/apps/" +
              time['appid'] + "/" + time['img_logo_url']+".jpg",
              most_played_game_name: time['name'],
              most_played_game_time_hr: Math.floor(time['playtime_forever']/60),
              most_played_game_time_minute: time['playtime_forever']%60,
              most_played_game_time: time['playtime_forever'],
          }
          if(this.topGames.length==0){
            this.topGames.push(topgame);
          }
          else{
            for( let i in this.topGames ){
              if(this.topGames[i].most_played_game_time<time['playtime_forever']){
                this.topGames.splice(Number(i), 0, topgame);
                break
              }
            }
            if(this.topGames.length>top_x_games){
              this.topGames.pop();
            }
          }

          this.total_playtime+= time['playtime_forever'];
        }
        this.userStats = {
          playtime_hr: Math.floor(this.total_playtime/60),
          playtime_minute: this.total_playtime % 60,
          playtime_2week_hr: Math.floor(this.two_week_playtime/60),
          playtime_2week_minute: this.two_week_playtime % 60,
          unplayed_games: this.total_unplayed_games,
          total_games: this.total_games,
        }
      }
      else{
        this.userStats_response = false;
      }
    },
    error=>{
      console.log("there is an error: " + error);
      this.error = error;
    });

  //getting friends list
  this.apiService.getFriendList(steam64id).subscribe(data =>{
    if(data['friendslist']['friends']){
      var top_x_friends = 3;
      for( let friend_info of data['friendslist']['friends']){
        var friend:Friends = {
          steam64_id: friend_info['steamid'],
          friend_since: friend_info['friend_since']
        }
        if(friend_info['friend_since']!=0){
          if(this.friends.length==0){
            this.friends.push(friend);
          }
          else{
            for( let i in this.friends ){
              if(this.friends[i].friend_since>friend_info['friend_since']){
                this.friends.splice(Number(i), 0, friend);
                break
              }
            }
            if(this.friends.length>top_x_friends){
              this.friends.pop();
            }
          }
        }
      }
      if(this.friends.length>0){
      for( let i in this.friends){
        this.apiService.getUserInfo(this.friends[i].steam64_id).subscribe(data =>
        { if(data['response']['players'][0]){
            data = data['response']['players'][0];
            var friend_userSummary:UserSummary = {
              avatar: data['avatarfull'],
              display_name: data['personaname'],
              profile_url: data['profileurl'],
              status: this.convertStatus(data['personastate']),
              steam64_id: data['steamid']
            }
            this.friends_info.splice(Number(i), 0, friend_userSummary);
          }
        });
      }
    }
    this.searching = false;
  }},
  error=>{
    console.log("there is an error: " + error);
    this.friend_error = error;
  });}
}
