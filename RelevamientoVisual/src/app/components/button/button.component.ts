import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {

  @Input() type: string;
  @Input() photoUrl: string;
  
  constructor(private router: Router) { }

  ngOnInit() {}

  goTo(){
    this.router.navigate(["/main", {queryParams:{"type":this.type}}]);
  }

}
