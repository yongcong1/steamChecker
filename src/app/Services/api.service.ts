import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { map,catchError, retry } from 'rxjs/operators';
import {JsonpModule, Jsonp, Response, Headers} from '@angular/http';

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


@Injectable({
  providedIn: 'root',
})

export class APIService {


  constructor(private http: HttpClient) { }

  //proxyURL = '/dev';
  proxyURL = '';
  apiURL = this.proxyURL + '/api/';

  //get the ISteamUser api to retrieve steamid from custom url
  userCustomUrl = this.apiURL + 'customURL/';
  getUserSteamId(customUrl: string){
    var parameters = "&vanityurl="+customUrl;
    return this.http.get(this.userCustomUrl+parameters).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  //get the ISteamUser api to retrieve information about the user based on their steam64 id
  userSummaryUrl = this.apiURL + 'userSummary/';
  getUserInfo(steam64id: string) {
    var parameters = "&steamids=" + steam64id;
    return this.http.get(this.userSummaryUrl +  parameters).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  userStatUrl = this.apiURL + 'userStats/';
  getUserStats(steam64id: string){
    var parameters = "&steamid=" + steam64id + "&include_appinfo=1";
    return this.http.get(this.userStatUrl + parameters).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  friendListUrl = this.apiURL + 'friendList/';
  getFriendList(steam64id: string){
    var parameters = "&steamid=" + steam64id + "&relationship=friend";
    return this.http.get(this.friendListUrl + parameters).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  steamAppDetail = this.apiURL + 'steamGameDetail/';
  getSteamDetails(gameID: string){
    var parameters = "appids=" + gameID;
    return this.http.get(this.steamAppDetail + parameters).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getAccount(){
    return this.http.get(this.proxyURL + '/account').pipe(
      retry(1),
      catchError(this.handleError)
    );
  }


  //error handling
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    if(error.status===500)
    return throwError(
      'invalid steam64 ID or custom URL, please enter a valid steam64 ID or custom URL'
    );
    else if(error.status==401)
    return throwError(
      'Your profile is private'
    );
    else
      return throwError('network error, please try again later');
  };
}
