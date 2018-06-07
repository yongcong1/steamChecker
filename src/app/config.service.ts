import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map,catchError, retry } from 'rxjs/operators';
import {JsonpModule, Jsonp, Response, Headers} from '@angular/http';

export interface UserSummary {
  avatar: string;
  display_name: string;
  profile_url: string;
  steam64_id: string;
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

export class ConfigService {
  constructor(private http: HttpClient) { }

  //get the ISteamUser api to retrieve steamid from custom url
  userCustomUrl = '/customURL/';
  getUserSteamId(customUrl: string){
    return this.http.get(this.userCustomUrl+"&vanityurl="+customUrl).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  //get the ISteamUser api to retrieve information about the user based on their steam64 id
  userSummaryUrl = '/userSummary/';
  getUserInfo(steam64id: string) {
    return this.http.get(this.userSummaryUrl +  "&steamids=" + steam64id).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  userStatUrl = '/userStats/';
  getUserStats(steam64id: string){
    return this.http.get(this.userStatUrl + "&steamid=" + steam64id + "&include_appinfo=1").pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  friendListUrl = '/friendList/';
  getFriendList(steam64id: string){
    return this.http.get(this.friendListUrl + "&steamid=" + steam64id + "&relationship=friend").pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getAccount(){
    return this.http.get('/account').pipe(
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
      'invalid steam64 ID, please enter a valid steam64 ID'
    );
    else if(error.status==401)
    return throwError(
      'Your profile is private'
    );
    else
      return throwError('network error, please try again later');
  };
}
