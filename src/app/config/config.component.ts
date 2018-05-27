import { Component, OnInit } from '@angular/core';
import { UserSummary,  UserStats, ConfigService } from '../config.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  providers: [ ConfigService ],
  styleUrls: ['./config.component.css']
})

export class ConfigComponent implements OnInit {

  userSummary: UserSummary;
  userStats: UserStats;
  total_playtime:number;
  two_week_playtime:number;
  total_unplayed_games:number;
  total_games:number;
  most_played_game_time:number;
  most_played_game_icon:string;
  most_played_game_appid:number;
  most_played_game_name:string;
  response:boolean;
  searchCustom_error: string;
  searchCustom_response: boolean;

  constructor(private configService: ConfigService) {
  }

  ngOnInit() {
    console.log("testing update v3");
  }

  key = 'XXXXXXXXXXXXXXXXXXXXXXXXXXX';


  searchCustom(customUrl: string){
    this.searchCustom_error="";
    this.searchCustom_response = false;
    this.response=false;
    this.userStats= null;
    this.userSummary=null;

    if(customUrl.length==0){
      this.searchCustom_error = "please enter a custom url";
      this.response=false;
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
        this.search(data['steamid']);
        this.searchCustom_response = true;
        this.response = true;
      }else{
        this.searchCustom_error = "invalid custom url";
      }
    }
    );}



  //search by steam64id
  search(steam64id: string){
    this.userStats= null;
    this.userSummary=null;
    this.total_playtime=0;
    this.two_week_playtime=0;
    this.total_unplayed_games=0;
    this.total_games=0;
    this.most_played_game_time=0;
    this.most_played_game_name=null;
    this.searchCustom_response=true;

    if(steam64id.length==0){
      this.searchCustom_response=false;
      this.response=false;
      this.searchCustom_error = "please enter a steam64 id";
      return;
    }

  //user info
    this.configService.getUserInfo(steam64id, this.key).subscribe((data: UserSummary) =>
    { if(data['response']['players']){
        data = data['response']['players'][0];
        this.userSummary = {
          avatar: data['avatarfull'],
          display_name: data['personaname'],
          profile_url: data['profileurl'],
          steam64_id: data['steamid'],
        }
    }}
  );

    //user stats
    this.configService.getUserStats(steam64id, this.key).subscribe((data:UserStats) =>
    {
      if(data['response']['games']){
        this.response=true;
        for( let time of data['response']['games'] ){
          this.total_games++;
          if(time['playtime_2weeks']){
            this.two_week_playtime+= time['playtime_2weeks'];
          }
          if(time['playtime_forever']==0){
            this.total_unplayed_games++;
          }
          if(this.most_played_game_time < time['playtime_forever']){
            this.most_played_game_time = time['playtime_forever'];
            this.most_played_game_icon = time['img_icon_url'];
            this.most_played_game_appid = time['appid'];
            this.most_played_game_name = time['name'];
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
          most_played_game_appid: this.most_played_game_appid,
          most_played_game_icon: "http://media.steampowered.com/steamcommunity/public/images/apps/" +
          this.most_played_game_appid+ "/" + this.most_played_game_icon+".jpg",
          most_played_game_name: this.most_played_game_name,
          most_played_game_time_hr: Math.floor(this.most_played_game_time/60),
          most_played_game_time_minute: this.most_played_game_time%60,
        }
      }
      else{
        this.response=false;
      }
    }
  );}
}
