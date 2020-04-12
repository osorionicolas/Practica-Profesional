import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { AngularFirestore, AngularFirestoreDocument  } from '@angular/fire/firestore';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-qrscanner',
  templateUrl: './qrscanner.component.html',
  styleUrls: ['./qrscanner.component.scss'],
})
export class QrscannerComponent implements OnInit {

  private objetoDoc: AngularFirestoreDocument<any>;

  constructor(private afs: AngularFirestore, private barcodeScanner: BarcodeScanner) { }

  ngOnInit() {}
  
  scan(){
      this.barcodeScanner.scan().then(barcodeData => {
        console.log('Barcode data', barcodeData.text);
        this.getById(barcodeData.text, "qrs");
      }).catch(err => {
          console.log('Error', err);
        });
  }

  getById(id: string, dataNombre: string) {
    this.objetoDoc = this.afs.doc<any>(`${dataNombre}/${id}`);
    let document = this.afs.collection(dataNombre).doc(id);
    document.get().subscribe(doc => {
        if (!doc.exists || doc.data().enabled == "false") {
          console.log(doc.data().enabled);
          return null;
        } else {
          this.credit(doc.data());
        }
      })
  }

  credit(documentData){
    console.log(documentData);
    this.objetoDoc.update({"enabled":"false"});
  }

}
