import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../config.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private configService:ConfigService) { }

  ngOnInit() {
  }

  searchCustom(custom_id){
    this.configService.custom_id(custom_id);
  }

  search(steam64ID){
    this.configService.show_stats(steam64ID);
  }

}
