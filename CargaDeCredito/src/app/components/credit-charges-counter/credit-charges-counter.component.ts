import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FirebaseService } from 'src/app/services/firebase.service';


@Component({
  selector: 'app-credit-charges-counter',
  templateUrl: './credit-charges-counter.component.html',
  styleUrls: ['./credit-charges-counter.component.scss'],
})
export class CreditChargesCounterComponent implements OnInit {

  private credit: number;
  
  constructor(private userService: UserService, private firebaseService: FirebaseService) { }

  ngOnInit() {
    this.userService.getAuthStateChanged().then((user:any) => {
      this.firebaseService.getObservableFromDocument("usersData", user.uid).subscribe((data: number) =>{
        this.credit = data;
      })
    });
  }
}
