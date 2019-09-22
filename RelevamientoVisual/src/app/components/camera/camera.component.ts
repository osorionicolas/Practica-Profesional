import { Component, OnInit, Input } from '@angular/core';
import { CameraService } from 'src/app/services/camera.service';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss'],
})
export class CameraComponent implements OnInit {

  @Input() type: string;
  @Input() photoUrl: string;
   
  constructor(private cameraService: CameraService ) { }

  ngOnInit() { }
  
  takePhoto(){
    this.cameraService.takePhoto(this.type);
  }

}