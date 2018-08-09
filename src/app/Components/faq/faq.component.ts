import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FAQComponent implements OnInit {

  listOfQuestions: Question[];
  title:string;

  constructor( private titleService:Title) {
    this.title = "Steam Check - Frequently Asked Questions";
  }

  ngOnInit() {
    this.setTitle(this.title);
    this.listOfQuestions = [];
    this.populateQuestions();
  }

  public setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }

  populateQuestions(){
    var question = 'Why can\'t I see my stats?';
    var answer = 'Make sure your steam profile is public and game details is also public in <a href="https://steamcommunity.com/my/edit/settings" target="_blank">Steam Settings</a>';
    var showDiv = false;
    this.addToQuestions(question, answer, showDiv);

    question = 'Why are some games not showing in game stats?';
    answer = 'Game stats will only show games that has current player stats, in other words steam has no player statistics for that particular game';
    showDiv = false;
    this.addToQuestions(question, answer, showDiv);

    question = 'Where are all these stats coming from?';
    answer = 'All stats are retrieved using steam API with the exception of Player statistics which is retrieved using steamKit2 .NET library.';
    showDiv = false;
    this.addToQuestions(question, answer, showDiv);
  }

  addToQuestions(question, answer, showDiv){
    var questionInterface:Question = { question: question, answer: answer, showDiv: showDiv };
    this.listOfQuestions.push(questionInterface);
  }

}

interface Question {
  question:string;
  answer:string;
  showDiv:boolean;
}
