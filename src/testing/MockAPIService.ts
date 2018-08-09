import { defer } from 'rxjs';

export interface UserSummary {
  avatar: string;
  display_name: string;
  profile_url: string;
  steam64_id: string;
  status: string;
}

export interface PrivateUserSummary{
  time_created: number;
  game_extra_info: string;
}

export interface UserStats{
  playtime_hr: number;
  playtime_minute: number;
  playtime_2week_hr: number;
  playtime_2week_minute: number;
  unplayed_games: number;
  total_games: number;
}

export interface TopGames{
  most_played_game_appid: number;
  most_played_game_icon: string;
  most_played_game_name: string;
  most_played_game_logo: string;
  most_played_game_time_hr: number;
  most_played_game_time_minute: number;
  most_played_game_time: number;
}

export interface Friends{
  steam64_id: string;
  friend_since: number;
}

export class MockAPIService{

  getUserSteamId(customUrl: string){
  }
  getUserInfo(steam64id: string) {
  }

  getUserStats(steam64id: string){
  }

  getFriendList(steam64id: string){
  }

  getSteamDetails(gameID: string){
  }

  getAccount(){
  }
}
