import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { CameraService } from 'src/app/services/camera.service';
import { Global } from 'src/app/global';

@Component({
  selector: 'app-list-feas',
  templateUrl: './list-feas.page.html',
  styleUrls: ['./list-feas.page.scss'],
})
export class ListFeasPage implements OnInit {

  images: Array<object>;
  slideOpts = {
    slidesPerView: 1,
    spaceBetween: 10,
    centeredSlides: true
  };

  constructor(
    private cameraService:CameraService, 
    private navCtrl: NavController, 
    private loadingController: LoadingController,
    private global: Global
  ) { }

  ngOnInit() {
    this.getAllImages();
  }

  getAllImages(){
    this.presentLoading();
    this.images = new Array<object>()
    this.cameraService.getCurrentUser;
    this.cameraService.getAllImages(this.global.type).then((images: firebase.storage.ListResult) => {
      images.items.forEach((image:firebase.storage.Reference) => {
        Promise.all([image.getDownloadURL(),this.cameraService.getOnce("images", image.name), this.cameraService.getOnce("votes", image.name) ]).then(values => {
          if(values[1].get("user") == this.cameraService.getCurrentUser().email.split('@')[0]){
            this.images.push({"url": values[0], "name": image.name, "date":values[1].get("date"), "user": values[1].get("user"), "votes":values[2].get("votes") || 0});
            this.images.sort((a:any,b:any) => (a.date > b.date) ? -1 : 1);
          }
        })
      })
    }).catch(() => {
      this.navCtrl.navigateRoot("login");
    })
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      duration: 2000,
      message: "Buscando imagenes"
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }
}

