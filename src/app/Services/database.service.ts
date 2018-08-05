import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private http: HttpClient) { }

  //proxyURL = '/dev';
  proxyURL = '';
  dbURL = this.proxyURL + '/db/';

  getGameList(){
    return this.http.get(this.dbURL + 'games');
  }

  getGameDetail(appid){
    return this.http.get(this.dbURL + 'gameDetail/' + appid);
  }

  navbarGetGameList(){
    return this.http.get(this.dbURL + 'navbarGameList');
  }

}
