import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Flashlight } from '@ionic-native/flashlight/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';
import { SmartAudioService } from 'src/app/services/smart-audio.service';
import { timer } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

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
  private eventListener;

  constructor(private vibration: Vibration, 
    private smartAudioService: SmartAudioService,
    private flashlight: Flashlight,
    private alertController: AlertController,
    private storage: Storage    
  ) {
    this.alarmaActivada = false;
    this.flagHorizontal = false;
    this.flagVertical = false;
    this.flagRight = false;
    this.flagLeft = false;
    this.eventListener = event => {
      this.processOrientation(event);
    };
  }

  ngOnInit() {
  }

  private changeLinesColor(colorClass:string, toColorClass:string){
    let lines = Array.from(document.getElementsByClassName(colorClass));
    for(let line of lines){
      line.setAttribute("class", toColorClass);
    }
  }

  activateAlarm() {
    const elistener = this.eventListener;
    if (!this.alarmaActivada) {
      this.alarmaActivada = !this.alarmaActivada;
      this.alarmActivatedEvent.emit(this.alarmaActivada);
      document.getElementById("alarm").className = "metal radial active";
      this.changeLinesColor("lineBottom","lineTop");
      window.addEventListener('deviceorientation', elistener, true);
      this.smartAudioService.play('horizontal');
    } 
    else {
      this.validatePassword().then(response => {
        console.log(response);
        if(response.data == true){
          this.alarmaActivada = !this.alarmaActivada;
          this.alarmActivatedEvent.emit(this.alarmaActivada);
          document.getElementById("alarm").className = "metal radial";
          this.changeLinesColor("lineTop","lineBottom");
          this.flagHorizontal = false;
          this.flagVertical = false;
          this.flagRight = false;
          this.flagLeft = false;
          this.stopVertical();
          this.init();
          window.removeEventListener('deviceorientation', elistener, true);
        }
      })
    }
  }

  private stopVertical() {
    this.flagLeft = false;
    this.flagRight = false;
  }

  private startVertical() {
      this.flagVertical = true;
      this.flagHorizontal = false;
      this.flagLeft = true;
      this.flagRight = true;
      this.flashlight.switchOn();
      timer(5000).subscribe( () => {
        this.flashlight.switchOff();
      });
      this.smartAudioService.play('vertical');
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
      this.smartAudioService.play('horizontal');
  }

  private init(){
      this.flagHorizontal = true;
      this.flagVertical = false;
      this.flagLeft = false;
      this.flagRight = false;
  }

  private processOrientation(event: DeviceOrientationEvent) {
    const alpha = event.alpha === null ? 0 : Math.round(event.alpha);
    const beta = event.beta === null ? 0 : Math.round(event.beta);
    const gamma = event.gamma === null ? 0 : Math.round(event.gamma);
    //console.log("Beta: " + beta + " Alpha: " + alpha + " Gamma: " + gamma);
    //console.log("Vertical: " + this.flagVertical + " Horizontal: " + this.flagHorizontal + " Right: " + this.flagRight + " Left: " + this.flagLeft);
    if (!this.flagVertical && (beta >= 80 && beta <= 100)) {
      this.stopHorizontal();
      this.startVertical();
    } else if (!this.flagHorizontal && (beta >= -10 && beta <= 10)) {
      this.stopVertical();
      this.startHorizontal();
    } else if (!this.flagLeft && !this.flagRight && this.flagHorizontal && (gamma < -70 && gamma >= -90)) {
      this.flagLeft = true;
      this.flagRight = false;
      this.smartAudioService.play('izquierda');
    } else if (!this.flagRight && !this.flagLeft && this.flagHorizontal && (gamma <= 90 && gamma > 70)) {
      this.flagRight = true;
      this.flagLeft = false;
      this.smartAudioService.play('derecha');
    } else if (this.flagHorizontal && (beta >= -10 && beta <= 10) && !(gamma <= 90 && gamma > 70) && !(gamma < -70 && gamma >= -90)) {
      this.flagRight = false;
      this.flagLeft = false;
    }
  }

  private async validatePassword() {
    let response;
    let password;
    this.storage.get('password').then((val) => {
      password = val
    });
    const alert = await this.alertController.create({
      header: 'Ingrese su contraseña',
      inputs: [
        {
          name: 'contraseña',
          type: 'password',
          placeholder: 'Contraseña'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            alert.dismiss(false);
            return false;
          }
        }, {
          text: 'Ok',
          handler: (input) => {
            if(input.contraseña == password){
              alert.dismiss(true);
              return false;
            }
            else{
              alert.dismiss(false);
              return false;
            }
          }
        }
      ]
    });
    await alert.present();
    await alert.onDidDismiss().then((data) => {
      response = data
    })
    return response
  }

}