import { Component, OnInit } from '@angular/core';
import { FcmService } from 'src/app/services/FcmService';


@Component({
  selector: 'app-push-notification',
  templateUrl: './push-notification.component.html',
  styleUrls: ['./push-notification.component.scss'],
})
export class PushNotificationComponent implements OnInit {

  constructor(private fcmService: FcmService) { }

  ngOnInit() {}

  sendPushNotification(){
    this.fcmService.sendNotification().subscribe(response => {
      console.log(response);
    });
  }

}
