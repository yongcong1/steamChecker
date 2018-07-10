import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root',
})

export class DisplayService {

  showStatsSource = new Subject<string>();
  showStats$ = this.showStatsSource.asObservable();
  customIdSource = new Subject<string>();
  customID$ = this.customIdSource.asObservable();
  constructor() { }

  showStats(steam64ID){
    this.showStatsSource.next(steam64ID);
  }

  setCustomID(customId){
    this.customIdSource.next(customId);
  }
}
