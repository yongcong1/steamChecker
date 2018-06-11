import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root',
})

export class DisplayService {

  show_stats_source = new Subject<string>();
  show_stats$ = this.show_stats_source.asObservable();
  custom_id_source = new Subject<string>();
  custom_id$ = this.custom_id_source.asObservable();
  constructor() { }

  show_stats(steam64ID){
    this.show_stats_source.next(steam64ID);
  }

  custom_id(custom_id){
    this.custom_id_source.next(custom_id);
  }
}
