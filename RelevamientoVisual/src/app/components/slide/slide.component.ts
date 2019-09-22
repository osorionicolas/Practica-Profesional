import { Component, OnInit } from '@angular/core';
import { CameraService } from 'src/app/services/camera.service';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.scss'],
})
export class SlideComponent implements OnInit {

  slideOpts = {
    initialSlide: 1,
    speed: 400,
    direction: "vertical"
  };

  images: Array<string> = new Array<string>()

  constructor(private cameraService:CameraService) { }

  ngOnInit() {
    this.getAllImages();
  }

  getAllImages(){
    this.images = [];
    this.cameraService.getAllImages().then((images: firebase.storage.ListResult) => {
      images.items.forEach((image:firebase.storage.Reference) => {
        image.getDownloadURL().then((url) => {
          this.images.push(url);
        })
      })
    })
  }

  vote(option){
    if(option == 0){
      console.log("dislike");
    }
    else if(option == 1){
      console.log("like");
    }
  }
}