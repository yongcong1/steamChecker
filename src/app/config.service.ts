import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
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
  most_played_game_appid: number;
  most_played_game_icon: string;
  most_played_game_name: string;
  most_played_game_time_hr: number;
  most_played_game_time_minute: number;
}


@Injectable({
  providedIn: 'root',
})


export class ConfigService {
  constructor(private http: HttpClient) { }

  //steam64id = 76561198021742536
  userCustomUrl2 = 'https://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/';
  userCustomUrl = 'ISteamUser/ResolveVanityURL/v0001/';

  getUserSteamId(customUrl: string, key: string){
    return this.http.get(this.userCustomUrl2 + "?key=" + key +  "&vanityurl=" + customUrl, httpOptions);
  }

  userSummaryUrl = 'ISteamUser/GetPlayerSummaries/v0002/';

  getUserInfo(steam64id: string, key: string) {

    return this.http.get(this.userSummaryUrl + "?key=" + key +  "&steamids=" + steam64id).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  userStatUrl = 'IPlayerService/GetOwnedGames/v0001/';

  getUserStats(steam64id: string, key: string){
    return this.http.get(this.userStatUrl + "?key=" + key +  "&steamid=" + steam64id + "&include_appinfo=1").pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

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
    return throwError(
      'Something bad happened; please try again later.');
  };
}
