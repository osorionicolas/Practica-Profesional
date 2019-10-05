import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SmartAudioService } from './services/smart-audio.service';
import { timer } from 'rxjs';

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
      this.smartAudioService.preload('horizontal', 'assets/sounds/horizontal.mp3');
      this.smartAudioService.preload('vertical', 'assets/sounds/vertical.mp3');
      this.smartAudioService.preload('derecha', 'assets/sounds/derecha.mp3');
      this.smartAudioService.preload('izquierda', 'assets/sounds/izquierda.mp3');
      timer(5000).subscribe( () => {
        this.showSplash = false;
      });
    });
  }
}
