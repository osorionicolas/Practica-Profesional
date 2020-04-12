import { Injectable } from '@angular/core';
import { FirebaseX } from '@ionic-native/firebase-x/ngx';
import { AngularFirestore } from 'angularfire2/firestore';
import { AuthenticationService } from './authentication.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class FcmService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'key=AAAAuzgPkY4:APA91bExakxSHDNXZzXlU-C1ZB1gXfJJ6GTVRwF1QtXorq94kI1lZV0s2F87Z4sb7PmAf2wPfeVmqzUhwW3Urativv5VTenx56h6vZy4-OpfuvDLeRNgQ0kvpbueUZojtzwmj1RAogLZ'
    })
  }

  constructor(private firebaseX: FirebaseX,
              private afs: AngularFirestore,
              private authService: AuthenticationService,
              private http: HttpClient) {}

  async getToken() {
    let token = await this.firebaseX.getToken();
    console.log(token)
    this.saveToken(token);
  }

  private saveToken(token) {
    if (!token) return;

    const devicesRef = this.afs.collection('devices');

    const data = {
      token,
      userId: this.authService.userDetails().uid
    };

    return devicesRef.doc(token).set(data);
  }

  onNotifications() {
    return this.firebaseX.onMessageReceived();
  }

  sendNotification() {
    let body = {
      "notification":{
        "title":"Ionic 4 Notification",
        "body":"This notification sent from POSTMAN using Firebase HTTP protocol",
        "sound":"default",
        "click_action":"FCM_PLUGIN_ACTIVITY",
        "icon":"fcm_push_icon"
      },
      "data":{
        "landing_page":"second",
      },
        //Un solo ID, topico o grupo
        "to":"foYnmoU1ejU:APA91bGpifXYSiQb00kUFdvkM9LF4FIfSFzGQxr8gumXHVO4vrQYTFZVlz86qPWVb2dsLx4LeQGvtUx5tB50CZupFuAHJcLXzpq-cZRPcACa4Q3Hn-UqSboUAo5PaBZtmAj46Mj1OJXR",
        // Multiples IDs
        //"registration_ids": [],
        "priority":"high"
    }
    return this.http.post("https://fcm.googleapis.com/fcm/send", body, this.httpOptions);
  }
}