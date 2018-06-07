import { Component, ViewChild } from '@angular/core';
import { UserSummary, ConfigService } from './config.service';
import { ConfigComponent } from './config/config.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [ ConfigService ],
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild(ConfigComponent) child;

  userSummary: UserSummary;
  title = 'Check Your Steam Stats';
  loggedIn: boolean;
  accountError: string;
  currentAccountID: string;

  constructor(private configService: ConfigService) {
  }

  ngOnInit() {
    this.setAccount();
  }

  searchUser(steam64id: string){
      this.configService.getUserInfo(steam64id).subscribe((data: UserSummary) =>
      { if(data['response']['players']){
          data = data['response']['players'][0];
          this.userSummary = {
            avatar: data['avatar'],
            display_name: data['personaname'],
            profile_url: data['profileurl'],
            steam64_id: data['steamid'],
          }
      }}
    );
  }

  setAccount(){
    this.configService.getAccount().subscribe(data => {
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
    })
  }
}
