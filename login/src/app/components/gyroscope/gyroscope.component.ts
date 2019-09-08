import { Component, OnInit } from '@angular/core';
import { Flashlight } from '@ionic-native/flashlight/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';
import { SmartAudioService } from 'src/app/services/smart-audio.service';


@Component({
  selector: 'app-gyroscope',
  templateUrl: './gyroscope.component.html',
  styleUrls: ['./gyroscope.component.scss'],
})
export class GyroscopeComponent implements OnInit {

alarmaActivada: Boolean;
  titulo: string;
  ultimoAlpha: number;
  ultimoBeta: number;
  ultimoGamma: number;
  private timeoutLeft: any;
  private timeoutRight: any;
  private timeoutVertical: any;
  private timeoutHorizontal: any;
  private flagLeft: boolean;
  private flagRight: boolean;
  private flagHorizontal: boolean;
  private flagVertical: boolean;
  private flagObtenerDatos: boolean;
  private eventListener;

  constructor(private vibration: Vibration, private smartAudioService: SmartAudioService,
    private flashlight: Flashlight) {
    this.alarmaActivada = false;
    this.titulo = 'Alarma de Robo - Desactivada';
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

  ActivarAlarma() {
    this.alarmaActivada = !this.alarmaActivada;
    this.titulo = 'Alarma de Robo';
    this.titulo += this.alarmaActivada ? ' - ON' : ' - OFF';
    const elistener = this.eventListener;

    if (this.alarmaActivada) {
      window.addEventListener('deviceorientation', elistener, true);
    } else {
      this.flagHorizontal = false;
      this.flagVertical = false;
      this.flagRight = false;
      this.flagLeft = false;
      this.stopVertical();
      this.stopHorizontal();
      this.stopLeft();
      this.stopRight();
      window.removeEventListener('deviceorientation', elistener, true);
    }
  }


  private stopVertical() {
    this.flagLeft = false;
    this.flagRight = false;
    this.flashlight.switchOff();
    this.smartAudioService.stopInterval('login');
    clearTimeout(this.timeoutVertical);
  }

  private startVertical() {
      this.flagVertical = true;
      this.flagHorizontal = false;
      this.flagLeft = true;
      this.flagRight = true;
      this.flashlight.switchOn();
      this.smartAudioService.play('login');
      this.smartAudioService.playInterval('login', 500);
      this.timeoutVertical = setTimeout(x => {
        this.stopVertical(); }, 5000);
  }

  private stopHorizontal() {
    this.flagLeft = false;
    this.flagRight = false;
    this.vibration.vibrate(0);
    this.smartAudioService.stopInterval('confirmation');
    clearTimeout(this.timeoutHorizontal);
  }

  private startHorizontal() {
      this.flagHorizontal = true;
      this.flagVertical = false;
      this.flagLeft = true;
      this.flagRight = true;
      this.vibration.vibrate(5000);
      this.smartAudioService.playInterval('confirmation', 500);
      this.timeoutHorizontal = setTimeout(x => {
        this.stopHorizontal(); }, 5000);
  }

  private stopLeft() {
    this.smartAudioService.stopInterval('error');
    clearTimeout(this.timeoutLeft);
  }

  private startLeft() {
      this.flagLeft = true;
      this.flagRight = false;
      this.smartAudioService.playInterval('error', 500);
      this.timeoutLeft = setTimeout(x => {
        this.stopLeft(); }, 5000);
  }

  private stopRight() {
    this.smartAudioService.stopInterval('boop');
    clearTimeout(this.timeoutRight);
  }

  private startRight() {
      this.flagRight = true;
      this.flagLeft = false;
      this.smartAudioService.playInterval('boop', 500);
      this.timeoutRight = setTimeout(x => {
        this.stopRight(); }, 5000);
  }

  private processOrientation(event: DeviceOrientationEvent) {
    const alpha = event.alpha === null ? 0 : Math.round(event.alpha);
    const beta = event.beta === null ? 0 : Math.round(event.beta);
    const gamma = event.gamma === null ? 0 : Math.round(event.gamma);
    if (this.flagObtenerDatos) {
      this.ultimoAlpha = alpha;
      this.ultimoGamma = gamma;
      this.ultimoBeta = beta;
      this.flagObtenerDatos = false;
    }

    if (this.flagVertical === false && (beta >= 80 && beta <= 100)) {
      // Vertical.
      this.stopHorizontal();
      this.stopRight();
      this.stopLeft();
      this.startVertical();
    } else if (this.flagHorizontal === false && (beta >= -10 && beta <= 10)) {
      // Horizontal.
      this.stopVertical();
      this.stopRight();
      this.stopLeft();
      this.startHorizontal();
    } else if (this.flagLeft === false && alpha - this.ultimoAlpha > 30) {
      // Izquierda.
      this.stopRight();
      this.startLeft();
    } else if (this.flagRight === false && alpha - this.ultimoAlpha < -30) {
      // Derecha.
      this.stopLeft();
      this.startRight();
    }
  }

}
