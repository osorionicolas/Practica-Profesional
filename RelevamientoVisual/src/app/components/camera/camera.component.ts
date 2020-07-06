import { Component, OnInit } from '@angular/core';
import { CameraService } from 'src/app/services/camera.service';
import { Global } from 'src/app/global';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss'],
})
export class CameraComponent implements OnInit {

  private type: any;
  
  constructor(private cameraService: CameraService, private global: Global) { 
    this.type = this.global.type
  }

  ngOnInit() { }
  
  takePhoto(){
    this.cameraService.takePhoto(this.type);
  }

}