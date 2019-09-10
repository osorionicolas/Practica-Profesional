import { Component, OnInit } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-qrscanner',
  templateUrl: './qrscanner.component.html',
  styleUrls: ['./qrscanner.component.scss'],
})
export class QrscannerComponent implements OnInit {

  constructor(private qrScanner: QRScanner, private barcodeScanner: BarcodeScanner) { }

  ngOnInit() {}

  scan(){
    console.log("QR Scanner");
    // Optionally request the permission early
    /*this.qrScanner.prepare().then((status: QRScannerStatus) => {
        console.log(status.authorized);
        if (status.authorized) {
          this.qrScanner.useFrontCamera();
          this.qrScanner.show();
          let scanSub = this.qrScanner.scan().subscribe((text: string) => {
            console.log('Scanned something', text);
            scanSub.unsubscribe(); // stop scanning
          });
        }
      }).catch((e: any) => console.log('Error is', e));*/

      this.barcodeScanner.scan().then(barcodeData => {
        console.log('Barcode data', barcodeData);
       }).catch(err => {
           console.log('Error', err);
       });
    }

}
