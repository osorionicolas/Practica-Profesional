import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-clear-charges',
  templateUrl: './clear-charges.component.html',
  styleUrls: ['./clear-charges.component.scss'],
})
export class ClearChargesComponent implements OnInit {

  private objetoDoc: AngularFirestoreDocument<any>;

  constructor(private afs: AngularFirestore, private firebaseService: FirebaseService, private userService: UserService) {}

  ngOnInit() {}

  clear(collection){
    this.firebaseService.clearCollection(collection);
  }

  overrideCollection(collection, property, value){
    let currentUser = this.userService.getCurrentUser();
    this.afs.collection(collection).get().subscribe(snapshot => {
      snapshot.docs.forEach(doc => {
        doc.ref.update({[property]:value});
      });
    });
    this.objetoDoc = this.afs.doc<any>(`usersData/${currentUser.uid}`);
    this.afs.collection("usersData").doc(currentUser.uid).get().subscribe(doc => {
      if (!doc.exists) {
        return null;
      } else {
        this.objetoDoc.update({"credit":0});
      }
    })
  }
}
