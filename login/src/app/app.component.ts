import { Component } from '@angular/core';

import { Platform, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SmartAudioService } from './services/smart-audio.service';
import { FcmService } from './services/FcmService';

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
    private smartAudioService: SmartAudioService,
    private fcm: FcmService,
    private toastController: ToastController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.smartAudioService.preload('login', 'assets/sounds/login.mp3');
      this.smartAudioService.preload('error', 'assets/sounds/error-wooden.mp3');
      this.smartAudioService.preload('boop', 'assets/sounds/click.mp3');
      this.smartAudioService.preload('confirmation', 'assets/sounds/confirmation.mp3');
      this.notificationSetup();
    });
  }

  private notificationSetup() {
    this.fcm.onNotifications().subscribe(
      (msg) => {
          console.log(msg);
          this.presentToast(msg.body);
      });
  }

  private async presentToast(message) {
    const toast = await this.toastController.create({
      position: "top",
      message,
      duration: 3000
    });
    toast.present();
  }
}
