import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Global } from 'src/app/global';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  private type:string;

  constructor(private route: ActivatedRoute, private router: Router, private global: Global) {
    this.type = this.route.snapshot.params['type'];
    if(this.type){
      this.global.type = this.type;
      this.router.navigateByUrl("/main/camera/" + this.type);
    }
  }

  ngOnInit() {
  }

}
