import { Component, OnInit } from '@angular/core';
import { APIService } from '../../Services/api.service';
import { DisplayService } from '../../Services/display.service';

@Component({
  selector: 'app-user-stat',
  templateUrl: './user-stat.component.html',
  styleUrls: ['./user-stat.component.css']
})
export class UserStatComponent implements OnInit {

  constructor(private apiService:APIService, private displayService: DisplayService) { }

  ngOnInit() {
    this.setAccount();
  }

  setAccount(){
    this.apiService.getAccount().subscribe(data => {
      if(!data['steamID']){
      }
      else if(data['steamID']==""){
      }
      else{
        this.displayService.showStats(data['steamID']);
      }
    });
  }
}
