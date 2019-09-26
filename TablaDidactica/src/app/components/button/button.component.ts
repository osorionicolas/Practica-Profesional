import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {

  @Output() playBool: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {}

  play(){
    this.playBool.emit();
  }
}
