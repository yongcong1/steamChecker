import { Component, OnInit } from '@angular/core';
import { DisplayService } from '../display.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  title = 'Check Your Steam Stats';

  constructor(private displayService:DisplayService) {
   }

  ngOnInit() {
  }

  searchCustom(custom_id){
    this.displayService.custom_id(custom_id);
  }

  search(steam64ID){
    this.displayService.show_stats(steam64ID);
  }

}
