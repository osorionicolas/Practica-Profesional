import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-controller',
  templateUrl: './nav-controller.component.html',
  styleUrls: ['./nav-controller.component.scss'],
})
export class NavControllerComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  goTo(){
    this.router.navigate(['/error', { error : "Prueba Error" }]);
  }

}
