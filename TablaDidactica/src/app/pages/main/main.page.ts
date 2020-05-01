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

  return(){
    this.languageBool = false;
    this.topicBool = false;
    this.language = "";
    this.topic = "";
  }

  changeLanguage(){
    switch(this.language){
      case "ingles": {
        this.setOption("espanol", "idiomas");
        break;
      }
      case "espanol": {
        this.setOption("portugues", "idiomas");
        break;
      }
      case "portugues": {
        this.setOption("ingles", "idiomas");
        break;
      }
    }
  }

  changeTopic(){
    switch(this.topic){
      case "animales": {
        this.setOption("colores", "temas")
        break;
      }
      case "colores": {
        this.setOption("numeros", "temas")
        break;
      }
      case "numeros": {
        this.setOption("animales", "temas")
        break;
      }
    }
  }
}
