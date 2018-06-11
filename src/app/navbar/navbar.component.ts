import { Component, OnInit } from '@angular/core';
import { APIService, UserSummary } from '../api.service';
import { DisplayService } from '../display.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  userSummary: UserSummary;
  loggedIn: boolean;
  accountError: string;
  currentAccountID: string;

  constructor(private apiService:APIService, private displayService: DisplayService) { }

  ngOnInit() {
    this.setAccount();
  }

  searchUser(steam64id: string){
      this.apiService.getUserInfo(steam64id).subscribe((data: UserSummary) =>
      { if(data['response']['players']){
          data = data['response']['players'][0];
          this.userSummary = {
            avatar: data['avatar'],
            display_name: data['personaname'],
            profile_url: data['profileurl'],
            steam64_id: data['steamid'],
            status: data['personastate'],
          }
      }}
    );
  }

  showStats(){
    this.displayService.show_stats(this.currentAccountID);
  }

  setAccount(){
    this.apiService.getAccount().subscribe(data => {
      if(!data['steamID']){
        this.loggedIn = false;
      }
      else if(data['steamID']==""){
        this.accountError = "You are not logged in";
      }
      else{
        this.loggedIn = true;
        this.currentAccountID = data['steamID'];
        this.searchUser(data['steamID']);
      }
    });
  }
}
