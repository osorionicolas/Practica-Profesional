import { Component, OnInit } from '@angular/core';
import { Global } from 'src/app/global';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab-bar',
  templateUrl: './tab-bar.component.html',
  styleUrls: ['./tab-bar.component.scss'],
})
export class TabBarComponent implements OnInit {

  private urlGallery:string = "/main/gallery/";
  private urlCamera:string = "/main/camera/";

  constructor(private global: Global, private router: Router) {
  }

  ngOnInit() { 
  }

  goTo(option){
    if(option == "camera"){
      this.router.navigateByUrl(this.urlCamera + this.global.type);
    }else if(option == "gallery"){
      this.router.navigateByUrl(this.urlGallery + this.global.type);
    }
  }
}