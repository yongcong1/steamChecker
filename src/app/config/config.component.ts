import { Component, OnInit } from '@angular/core';
import { UserSummary,  UserStats, ConfigService, TopGames } from '../config.service';
import {ChartModule} from 'primeng/chart';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  providers: [ ConfigService ],
  styleUrls: ['./config.component.css']
})

export class ConfigComponent implements OnInit {

  topGames:TopGames[]=[];
  userSummary: UserSummary;
  userStats: UserStats;
  total_playtime: number;
  two_week_playtime: number;
  total_unplayed_games: number;
  total_games: number;
  empty_search: boolean;
  userStats_response: boolean;
  userSummary_response: boolean;
  searchCustom_response: boolean;
  key: string;
  gameStats: any;
  currentTab = 0;
  error: string;

  constructor(private configService: ConfigService) {
  }

  ngOnInit() {
    this.getApiKey();
  }

  //parse the steam api key from the json file
  getApiKey(){
    this.configService.getApi().subscribe(data=> {
      this.key=data['apiKey'];
    });
  }

  showTab(tab: number){
    this.currentTab = tab;
  }

  newSearch(){
    this.userStats= null;
    this.userSummary=null;
    this.gameStats=null;
    this.error=null;
    this.topGames=[];
    this.empty_search = false;
  }

  //the api returns the steamid that belongs to the custom name/url
  searchCustom(customUrl: string){
    this.newSearch();
    this.searchCustom_response = null;

    if(customUrl.length==0){
      this.empty_search = true;
      return;
    }
    if(customUrl.includes("https://steamcommunity.com/id/"))
      customUrl = customUrl.split("https://steamcommunity.com/id/")[1];
    if(customUrl.slice(-1)=="/"){
      customUrl = customUrl.substring(0, customUrl.length-1);
    }
    this.configService.getUserSteamId(customUrl, this.key).subscribe(data => {
      data=data['response'];
      if(data['success']==1){
        this.searchCustom_response = true;
        this.search(data['steamid']);
      }
      else{
        this.searchCustom_response = false;
      }
    }, error=>{
      console.log("there is an error: " + error);
      this.error = error;
    }
    );}

  makeGameGraphs(data){
      let gameInfo = data.response.games
     // console.log(gameInfo.map(a => a.playtime_forever));
     var filteredAry = gameInfo.filter(e => e.playtime_forever > 300)
     console.log(filteredAry)
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
        ]
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

  //user info
    this.configService.getUserInfo(steam64id, this.key).subscribe(data =>
    { if(data['response']['players'][0]){
        data = data['response']['players'][0];
        this.userSummary_response = true;
        this.userSummary = {
          avatar: data['avatarfull'],
          display_name: data['personaname'],
          profile_url: data['profileurl'],
          steam64_id: data['steamid'],
        }
    }}
  );

    //user stats
    this.configService.getUserStats(steam64id, this.key).subscribe(data =>
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
              most_played_game_icon: "http://media.steampowered.com/steamcommunity/public/images/apps/" +
              time['appid']+ "/" + time['img_icon_url']+".jpg",
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

        for( let games of this.topGames )
        console.log(games.most_played_game_name);
      }
      else{
        this.userStats_response = false;
      }
    }, error=>{
      console.log("there is an error: " + error);
      this.error = error;
    }
  );}
}
