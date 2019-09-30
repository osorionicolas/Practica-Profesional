import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Flashlight } from '@ionic-native/flashlight/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';
import { SmartAudioService } from 'src/app/services/smart-audio.service';

@Component({
  selector: 'app-alarm',
  templateUrl: './alarm.component.html',
  styleUrls: ['./alarm.component.scss'],
})
export class AlarmComponent implements OnInit {

  @Output() alarmActivatedEvent: EventEmitter<Boolean> = new EventEmitter<Boolean>();
  alarmaActivada: Boolean;
  private flagLeft: boolean;
  private flagRight: boolean;
  private flagHorizontal: boolean;
  private flagVertical: boolean;
  private flagObtenerDatos: boolean;
  private eventListener;

  constructor(private vibration: Vibration, private smartAudioService: SmartAudioService,
    private flashlight: Flashlight) {
    this.alarmaActivada = false;
    this.flagHorizontal = false;
    this.flagVertical = false;
    this.flagRight = false;
    this.flagLeft = false;
    this.flagObtenerDatos = true;
    this.eventListener = event => {
      this.processOrientation(event);
    };

    setInterval(x => {
      this.flagObtenerDatos = true;
    }, 1000);
  }

  ngOnInit() {
  }

  changeLinesColor(colorClass:string, toColorClass:string){
    let lines = Array.from(document.getElementsByClassName(colorClass));
    for(let line of lines){
      line.setAttribute("class", toColorClass);
    }
  }

  activateAlarm() {
    this.alarmaActivada = !this.alarmaActivada;
    this.alarmActivatedEvent.emit(this.alarmaActivada);
    const elistener = this.eventListener;
    if (this.alarmaActivada) {
      document.getElementById("alarm").className = "metal radial active";
      this.changeLinesColor("lineBottom","lineTop");
      window.addEventListener('deviceorientation', elistener, true);
    } 
    else {
      document.getElementById("alarm").className = "metal radial";
      this.changeLinesColor("lineTop","lineBottom");
      this.flagHorizontal = false;
      this.flagVertical = false;
      this.flagRight = false;
      this.flagLeft = false;
      this.stopVertical();
      this.stopHorizontal();
      window.removeEventListener('deviceorientation', elistener, true);
    }
  }

  private stopVertical() {
    this.flagLeft = false;
    this.flagRight = false;
    this.flashlight.switchOff();
  }

  private startVertical() {
      this.flagVertical = true;
      this.flagHorizontal = false;
      this.flagLeft = true;
      this.flagRight = true;
      this.flashlight.switchOn();
      this.smartAudioService.play('login');
  }

  private stopHorizontal() {
    this.flagLeft = false;
    this.flagRight = false;
    this.vibration.vibrate(0);
  }

  private startHorizontal() {
      this.flagHorizontal = true;
      this.flagVertical = false;
      this.flagLeft = false;
      this.flagRight = false;
      this.vibration.vibrate(5000);
      this.smartAudioService.play('confirmation');
  }

  private processOrientation(event: DeviceOrientationEvent) {
    const alpha = event.alpha === null ? 0 : Math.round(event.alpha);
    const beta = event.beta === null ? 0 : Math.round(event.beta);
    const gamma = event.gamma === null ? 0 : Math.round(event.gamma);
    if (this.flagObtenerDatos) {
      this.flagObtenerDatos = false;
    }
    console.log("Beta: " + beta + " Alpha: " + alpha + " Gamma: " + gamma);
    console.log("Vertical: " + this.flagVertical + " Horizontal: " + this.flagHorizontal + " Right: " + this.flagRight + " Left: " + this.flagLeft);
    if (this.flagVertical == false && (beta >= 80 && beta <= 100)) {
      console.log("Vertical");
      this.stopHorizontal();
      this.startVertical();
    } else if (this.flagHorizontal == false && (beta >= -10 && beta <= 10)) {
      console.log("Horizontal");
      this.stopVertical();
      this.startHorizontal();
    } else if (this.flagLeft == false && (alpha > 300 && gamma < -60)) {
      console.log("Izquierda");
      this.flagLeft = true;
      this.flagRight = false;
      this.smartAudioService.play('error');
    } else if (this.flagRight == false && (alpha < 300 && gamma > 70)) {
      console.log("Derecha");
      this.flagRight = true;
      this.flagLeft = false;
      this.smartAudioService.play('click');
    } else if (this.flagHorizontal == true && (beta >= -10 && beta <= 10)) {
      this.flagRight = false;
      this.flagLeft = false;
    }
  }

}