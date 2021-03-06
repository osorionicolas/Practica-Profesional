import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ToastController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Storage } from '@ionic/storage';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-scan-button',
  templateUrl: './scan-button.component.html',
  styleUrls: ['./scan-button.component.scss'],
})
export class ScanButtonComponent implements OnInit {

  private device: string = "mobile";
  private chargesCollection: string = "usedCharges"
  private usersCollection: string = "usersData"

  constructor(
    private firebaseService: FirebaseService, 
    private barcodeScanner: BarcodeScanner, 
    private userService: UserService, 
    private toastController: ToastController,
    private storage: Storage
  ) {}

  ngOnInit(){}
  
  scan(){
    if(this.device == "mobile"){
      this.barcodeScanner.scan().then(barcodeData => {
        console.log('Barcode data', barcodeData.text);
        this.getByIdAndUpdateCredit(barcodeData.text, "qrs");
      }).catch(err => {
        this.presentToast("Dispositivo no habilitado para carga QR", "danger");
      });
    }
    else{
      this.getByIdAndUpdateCredit("8c95def646b6127282ed50454b73240300dccabc", "qrs");
    }
  }

  getByIdAndUpdateCredit(barcodeId: string, dataNombre: string) {
    let currentUser = this.userService.getCurrentUser();
    this.firebaseService.getOnce(dataNombre, barcodeId).subscribe(async doc => {
      let validation = await this.validate(currentUser, doc, barcodeId);
      if (validation) {
        this.firebaseService.getOnce(this.usersCollection, currentUser.uid).toPromise().then(data =>{
          let actualCredit = data.get("credit") || 0
          let credit = actualCredit + doc.data().value;
          this.firebaseService.update(dataNombre, barcodeId, {"enabled":"false"});
          this.firebaseService.add(this.chargesCollection, {"date":Date.now(),"user":currentUser.uid, "id":barcodeId});
          this.firebaseService.setDocument(this.usersCollection, currentUser.uid, "credit", credit);
          this.presentToast('Carga Realizada con Exito', "success");
        })
      } else {
        this.presentToast('Código QR ya utilizado', "danger");
      }
    })
  }
  
  validate(currentUser, doc, barcodeId){
    let currentUserProfilePromise = this.storage.get('profile');
    let chargesCountPromise = this.countCharges(currentUser.uid, barcodeId);

    let validationResult = Promise.all([currentUserProfilePromise, chargesCountPromise]).then(values => {
      let result = false;
      if(doc.exists && ((values[0] == "admin" && values[1] <= 1) || 
        (values[0] != "admin" && values[1] == 0) && doc.data().enabled == "true")) {
          result = true;
        }
      return result;
    })
    return validationResult;
  }

  countCharges(uId, barcodeId){
    return new Promise<any>((resolve) => {
      this.firebaseService.getAll(this.chargesCollection, ref => ref.where("user", "==", uId).where("id", "==", barcodeId)).subscribe((docs: Array<any>) => {
        resolve(docs.length);
      })
    })
  }

  
  async presentToast(message, color) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: "middle",
      color: color
    });
    toast.present();
  }
}
