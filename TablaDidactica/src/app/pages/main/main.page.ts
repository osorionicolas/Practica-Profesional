import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  private languageBool:boolean;
  private topicBool:boolean;
  private language:string;
  private topic:string;
  private play:boolean;

  constructor() {
    this.languageBool = false;
    this.topicBool = false;
  }

  ngOnInit() {}

  setOption(optionSelected, category){
    if(category == "idiomas"){
      this.language = optionSelected;
      this.languageBool = true;
    }
    else if(category == "temas"){
      this.topic = optionSelected;
      this.topicBool = true;
    }
  }

  setPlay(){
    this.play = true;
    this.languageBool = false;
    this.topicBool = false;
  }
}
