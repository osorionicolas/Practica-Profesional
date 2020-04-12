import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-siren',
  templateUrl: './siren.component.html',
  styleUrls: ['./siren.component.scss'],
})
export class SirenComponent implements OnInit {

  @Input() private isAlarmActivated: Boolean;

  constructor() { }

  ngOnInit() {
    Array.prototype.forEach.call(document.getElementsByClassName("light"), function(el){
      el.setAttribute("class", "light");
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {  
      let change = changes[propName];
      if(JSON.stringify(change.currentValue)){
        this.toggleAlarm();
      } 
    }
  }

  toggleAlarm(){
    if(this.isAlarmActivated){
      console.log("Alarm activated " + this.isAlarmActivated);
      Array.prototype.forEach.call(document.getElementsByClassName("light"), function(el){
        el.setAttribute("class", "light");
      })
      setTimeout(function() {
        document.getElementById('light-1').setAttribute('class', 'light strobe blue');
        document.getElementById('light-2').setAttribute('class', 'light strobe red delay');
      }, 50);    
    }
    else{
      console.log("Alarm Activated " + this.isAlarmActivated);
      Array.prototype.forEach.call(document.getElementsByClassName("light"), function(el){
        el.setAttribute("class", "light");
      })
    }
  }
}
