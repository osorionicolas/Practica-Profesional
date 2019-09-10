import { Component, OnInit } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {

  constructor(private localNotifications: LocalNotifications) { }

  ngOnInit() {}

  localNotification(number){
    // Schedule a single notification
    console.log(this.localNotifications.getDefaults())
    this.localNotifications.schedule({
      id: 1,
      text: 'Uploading Image',
      progressBar: { "value":  number}
    });
  }

}
