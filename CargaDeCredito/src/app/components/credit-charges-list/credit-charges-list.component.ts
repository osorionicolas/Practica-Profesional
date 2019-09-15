import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-credit-charges-list',
  templateUrl: './credit-charges-list.component.html',
  styleUrls: ['./credit-charges-list.component.scss'],
})
export class CreditChargesListComponent implements OnInit {

  private charges: Observable<any[]>;
  private objetoDoc: AngularFirestoreDocument<any>;

  constructor(private afs: AngularFirestore, private firebaseService: FirebaseService, private userService: UserService) {
    this.userService.getAuthStateChanged().then((user:any) => {
      this.charges = this.afs.collection('usedCharges').valueChanges().pipe(
        map(charge => charge.sort((a:any, b:any) => new Date(a.date).getTime() - new Date(b.date).getTime()))
      );    
    })
  }

  ngOnInit() { }

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
