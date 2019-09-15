import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-scan-button',
  templateUrl: './scan-button.component.html',
  styleUrls: ['./scan-button.component.scss'],
})
export class ScanButtonComponent implements OnInit {

  private currentUser;
  private device: string = "";

  constructor(private firebaseService: FirebaseService, private afs: AngularFirestore, private barcodeScanner: BarcodeScanner, private afsAuth: AngularFireAuth, private toastController: ToastController) {}

  ngOnInit(){ }
  
  scan(){
    if(this.device == "mobile"){
      this.barcodeScanner.scan().then(barcodeData => {
        console.log('Barcode data', barcodeData.text);
        this.getById(barcodeData.text, "qrs");
      }).catch(err => {
        this.presentToast("Dispositivo no habilitado para carga QR", "danger");
      });
    }
    else{
      this.getById("8c95def646b6127282ed50454b73240300dccabc", "qrs");
    }
  }

  getById(id: string, dataNombre: string) {
    this.currentUser = this.afsAuth.auth.currentUser;
    let document = this.afs.collection(dataNombre).doc(id).get().subscribe(doc => {
        if (!doc.exists || doc.data().enabled == "false") {
          this.presentToast('Código QR ya utilizado', "tertiary");
        } else {
          let credit = doc.data().value;
          this.firebaseService.update(dataNombre,id,{"enabled":"false"});
          this.firebaseService.add("usedCharges", {"date":Date.now(),"user":this.currentUser.uid,"id":doc.id,"value":credit});
          this.firebaseService.setDocument("usersData",this.currentUser.uid,"credit",credit);
          this.presentToast('Carga Realizada con Exito', "success");
        }
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
