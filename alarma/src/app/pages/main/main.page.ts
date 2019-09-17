import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  private isAlarmActivated: Boolean;
  constructor() { }

  ngOnInit() {
  }

  setAlarm(isAlarmActivated:Boolean){
    this.isAlarmActivated = isAlarmActivated;
  }

}
