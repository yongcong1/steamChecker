import { Component } from '@angular/core';
import { UserSummary, ConfigService } from './config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [ ConfigService ],
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  userSummary: UserSummary;
  title = 'Check Your Steam Stats';
  loggedIn: boolean;
  key: string;
  accountError: string;

  constructor(private configService: ConfigService) {
  }

  ngOnInit() {
    this.key = 'A736FCCD373C01491715163D7FB4DFB1';
    this.getApiKey();
    console.log(this.key);
    this.setAccount();
  }

  getApiKey(){
    this.configService.getApi().subscribe(data=>{
        this.key=data['apiKey'];
      }
    );
  }

  searchUser(steam64id: string){
      this.configService.getUserInfo(steam64id, this.key).subscribe((data: UserSummary) =>
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
      if(data['steamID']==""){
        this.accountError = "You are not logged in";
      }
      else{
        this.loggedIn = true;
        this.searchUser(data['steamID']);
      }
    })
  }
}
