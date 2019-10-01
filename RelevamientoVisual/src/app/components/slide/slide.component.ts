import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { CameraService } from 'src/app/services/camera.service';
import { IonSlides, NavController } from '@ionic/angular';
import { Global } from 'src/app/global';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.scss'],
})
export class SlideComponent implements OnInit {

  @Input() actualizarListado: string;
  @ViewChild('slides', {static: false}) slides:IonSlides;
  images: Array<object> = new Array<object>();

  slideOpts = {
    slidesPerView: 1,
    spaceBetween: 10,
    centeredSlides: true
  };

  constructor(private cameraService:CameraService, private navCtrl: NavController, private global: Global) { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.getAllImages()
  }

  getAllImages(){
    this.images = new Array<object>(); 
    this.cameraService.getAllImages(this.global.type).then((images: firebase.storage.ListResult) => {
      images.items.forEach((image:firebase.storage.Reference) => {
        Promise.all([image.getDownloadURL(),this.cameraService.getOnce("images", image.name), this.cameraService.getOnce("votes", image.name) ]).then(values => {
          this.images.push({"url": values[0], "name": image.name, "date":values[1].get("date"), "user": values[1].get("user"), "votes":values[2].get("votes") || 0});
        })
      })
    }).catch(() => {
      this.navCtrl.navigateRoot("login");
    })
  }

  vote(option){
    this.slides.getActiveIndex().then(index =>{
      let imageName = this.images[index]["name"];
      this.cameraService.getOnce("votes", imageName).then(actualVotes =>{
        let votes = actualVotes.get("votes") || 0
        if(actualVotes.get("user") != this.cameraService.getCurrentUser().uid){
          if(option == 0){
            this.cameraService.setDocument("votes",imageName,{"votes": votes - 1, "user": this.cameraService.getCurrentUser().uid});
          }
          else if(option == 1){
            this.cameraService.setDocument("votes",imageName,{"votes": votes + 1, "user": this.cameraService.getCurrentUser().uid});
          }
        }
        else{
          console.log("User has already voted");
        }
      });
    });
  }
}