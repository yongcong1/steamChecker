import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private http: HttpClient) { }

  getGameList(){
    return this.http.get('/games');
  }

  getGameDetail(appid){
    return this.http.get('/gameDetail/' + appid);
  }
}
