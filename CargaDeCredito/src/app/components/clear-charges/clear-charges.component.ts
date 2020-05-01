import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-clear-charges',
  templateUrl: './clear-charges.component.html',
  styleUrls: ['./clear-charges.component.scss'],
})
export class ClearChargesComponent implements OnInit {

  private usersCollection: string = "usersData"

  constructor(
    private firebaseService: FirebaseService, 
    private userService: UserService
  ) {}

  ngOnInit() {}

  clear(collection){
    this.firebaseService.clearCollection(collection);
  }

  overrideCollection(){
    let currentUser = this.userService.getCurrentUser();
    this.firebaseService.getCollection('qrs').subscribe(snapshot => {
      snapshot.docs.forEach(doc => {
        doc.ref.update({["enabled"]:"true"});
      });
    });
    let objetoDoc = this.firebaseService.createDoc(this.usersCollection, currentUser.uid);
    this.firebaseService.getOnce(this.usersCollection, currentUser.uid).subscribe(doc => {
      if (!doc.exists) {
        return null;
      } else {
        objetoDoc.update({"credit":0});
      }
    })
  }
}
