import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { timer } from 'rxjs/internal/observable/timer';
import { SmartAudioService } from './services/smart-audio.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  
  showSplash: Boolean = true;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private smartAudioService: SmartAudioService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.smartAudioService.preload('espanol_amarillo', 'assets/sonidos/espanol/amarillo.mp3');
      this.smartAudioService.preload('espanol_azul', 'assets/sonidos/espanol/azul.mp3');
      this.smartAudioService.preload('espanol_rojo', 'assets/sonidos/espanol/rojo.mp3');
      this.smartAudioService.preload('espanol_verde', 'assets/sonidos/espanol/verde.mp3');
      this.smartAudioService.preload('espanol_violeta', 'assets/sonidos/espanol/violeta.mp3');
      this.smartAudioService.preload('espanol_uno', 'assets/sonidos/espanol/uno.mp3');
      this.smartAudioService.preload('espanol_dos', 'assets/sonidos/espanol/dos.mp3');
      this.smartAudioService.preload('espanol_tres', 'assets/sonidos/espanol/tres.mp3');
      this.smartAudioService.preload('espanol_cuatro', 'assets/sonidos/espanol/cuatro.mp3');
      this.smartAudioService.preload('espanol_cinco', 'assets/sonidos/espanol/cinco.mp3');
      this.smartAudioService.preload('espanol_conejo', 'assets/sonidos/espanol/conejo.mp3');
      this.smartAudioService.preload('espanol_gato', 'assets/sonidos/espanol/gato.mp3');
      this.smartAudioService.preload('espanol_perro', 'assets/sonidos/espanol/perro.mp3');
      this.smartAudioService.preload('espanol_vaca', 'assets/sonidos/espanol/vaca.mp3');
      this.smartAudioService.preload('espanol_mariposa', 'assets/sonidos/espanol/mariposa.mp3');

      this.smartAudioService.preload('ingles_amarillo', 'assets/sonidos/ingles/amarillo.mp3');
      this.smartAudioService.preload('ingles_azul', 'assets/sonidos/ingles/azul.mp3');
      this.smartAudioService.preload('ingles_rojo', 'assets/sonidos/ingles/rojo.mp3');
      this.smartAudioService.preload('ingles_verde', 'assets/sonidos/ingles/verde.mp3');
      this.smartAudioService.preload('ingles_violeta', 'assets/sonidos/ingles/violeta.mp3');
      this.smartAudioService.preload('ingles_uno', 'assets/sonidos/ingles/uno.mp3');
      this.smartAudioService.preload('ingles_dos', 'assets/sonidos/ingles/dos.mp3');
      this.smartAudioService.preload('ingles_tres', 'assets/sonidos/ingles/tres.mp3');
      this.smartAudioService.preload('ingles_cuatro', 'assets/sonidos/ingles/cuatro.mp3');
      this.smartAudioService.preload('ingles_cinco', 'assets/sonidos/ingles/cinco.mp3');
      this.smartAudioService.preload('ingles_conejo', 'assets/sonidos/ingles/conejo.mp3');
      this.smartAudioService.preload('ingles_gato', 'assets/sonidos/ingles/gato.mp3');
      this.smartAudioService.preload('ingles_perro', 'assets/sonidos/ingles/perro.mp3');
      this.smartAudioService.preload('ingles_vaca', 'assets/sonidos/ingles/vaca.mp3');
      this.smartAudioService.preload('ingles_mariposa', 'assets/sonidos/ingles/mariposa.mp3');
	  
	    this.smartAudioService.preload('portugues_amarillo', 'assets/sonidos/portugues/amarillo.mp3');
      this.smartAudioService.preload('portugues_azul', 'assets/sonidos/portugues/azul.mp3');
      this.smartAudioService.preload('portugues_rojo', 'assets/sonidos/portugues/rojo.mp3');
      this.smartAudioService.preload('portugues_verde', 'assets/sonidos/portugues/verde.mp3');
      this.smartAudioService.preload('portugues_violeta', 'assets/sonidos/portugues/violeta.mp3');
      this.smartAudioService.preload('portugues_uno', 'assets/sonidos/portugues/uno.mp3');
      this.smartAudioService.preload('portugues_dos', 'assets/sonidos/portugues/dos.mp3');
      this.smartAudioService.preload('portugues_tres', 'assets/sonidos/portugues/tres.mp3');
      this.smartAudioService.preload('portugues_cuatro', 'assets/sonidos/portugues/cuatro.mp3');
      this.smartAudioService.preload('portugues_cinco', 'assets/sonidos/portugues/cinco.mp3');
      this.smartAudioService.preload('portugues_conejo', 'assets/sonidos/portugues/conejo.mp3');
      this.smartAudioService.preload('portugues_gato', 'assets/sonidos/portugues/gato.mp3');
      this.smartAudioService.preload('portugues_perro', 'assets/sonidos/portugues/perro.mp3');
      this.smartAudioService.preload('portugues_vaca', 'assets/sonidos/portugues/vaca.mp3');
      this.smartAudioService.preload('portugues_mariposa', 'assets/sonidos/portugues/mariposa.mp3');

      timer(5000).subscribe( () => {
        this.showSplash = false;
      });
    });

  }
}
