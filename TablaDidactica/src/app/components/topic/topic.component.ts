import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss'],
})
export class TopicComponent implements OnInit {

  private options: Array<string>;
  @Input() category: string;
  @Output() private selected: EventEmitter<string> = new EventEmitter<string>();
  
  constructor() {}

  ngOnInit() {
    if(this.category == "idiomas")
      this.options = new Array<string>("ingles","espanol","portugues");
    else if(this.category == "temas")
      this.options = new Array<string>("animales","colores","numeros");
  }

  select(option){
    this.selected.emit(option);
  }

}
