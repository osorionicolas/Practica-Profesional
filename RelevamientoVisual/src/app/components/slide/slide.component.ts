import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { CameraService } from 'src/app/services/camera.service';
import { IonSlides, NavController } from '@ionic/angular';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.scss'],
})
export class SlideComponent implements OnInit {

  @Input() actualizarListado: boolean;
  @ViewChild('slides', {static: false}) slides:IonSlides;
  images: Array<object> = new Array<object>()


  slideOpts = {
    slidesPerView: 1,
    spaceBetween: 10,
    centeredSlides: true
  };

  constructor(private cameraService:CameraService, private navCtrl: NavController) { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.getAllImages();
  }

  getAllImages(){
    this.images = new Array<object>();
    this.cameraService.getAllImages("lindas").then((images: firebase.storage.ListResult) => {
      images.items.forEach((image:firebase.storage.Reference) => {
        Promise.all([image.getDownloadURL(), image.getMetadata()]).then((values) => {
          this.images.push({"url": values[0], "name": image.name, "metadata": values[1]});

        })
      })
    }).catch(() => {
      this.navCtrl.navigateRoot("login");
    })
  }

  vote(option){
    this.slides.getActiveIndex().then(data =>{
      console.log(this.images[data]["name"]);
      if(option == 0){
        console.log("dislike");
      }
      else if(option == 1){
        console.log("like");
      }
    });
  }
}