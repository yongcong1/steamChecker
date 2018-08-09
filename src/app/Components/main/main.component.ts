import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor( private titleService: Title ) { this.setTitle("Steam Check - Explore Your Stats")}

  ngOnInit() {
  }


  setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }

}
