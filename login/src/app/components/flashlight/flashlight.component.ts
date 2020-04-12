import { Component, OnInit } from '@angular/core';
import { Flashlight } from '@ionic-native/flashlight/ngx';

@Component({
  selector: 'app-flashlight',
  templateUrl: './flashlight.component.html',
  styleUrls: ['./flashlight.component.scss'],
})
export class FlashlightComponent implements OnInit {

  constructor(private flashlight: Flashlight) { }

  ngOnInit() {}

  switch(){
    this.flashlight.toggle();
  }

}
