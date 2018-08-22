import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root',
})

export class DisplayService {

  showStatsSource = new Subject<boolean>();
  showStats$ = this.showStatsSource.asObservable();

  steamIDSource = new Subject<string>();
  steamID$ = this.steamIDSource.asObservable();

  customIdSource = new Subject<string>();
  customID$ = this.customIdSource.asObservable();
  constructor() { }

  showStats(show){
    this.showStatsSource.next(show);
  }

  steamID(steam64ID){
    this.steamIDSource.next(steam64ID);
  }

  setCustomID(customId){
    this.customIdSource.next(customId);
  }

}
