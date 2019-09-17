import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SmartAudioService } from './services/smart-audio.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
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
      this.smartAudioService.preload('login', 'assets/sounds/login.mp3');
      this.smartAudioService.preload('error', 'assets/sounds/error.mp3');
      this.smartAudioService.preload('click', 'assets/sounds/click.mp3');
      this.smartAudioService.preload('confirmation', 'assets/sounds/confirmation.mp3');
    });
  }
}
