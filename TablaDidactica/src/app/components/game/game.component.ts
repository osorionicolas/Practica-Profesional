import { Component, OnInit, Input } from '@angular/core';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { SmartAudioService } from 'src/app/services/smart-audio.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {

  private orientation: string;

  private array: Array<string>;
  @Input() language: string;
  @Input() topic: string;

  constructor(private screenOrientation: ScreenOrientation, private smartAudioService: SmartAudioService) {}

  ngOnInit() {
    if(this.topic == "colores")
      this.array = Array<string>("verde","rojo","azul","amarillo","violeta");
    if(this.topic == "numeros")
      this.array = Array<string>("uno","dos","tres","cuatro","cinco");
    if(this.topic == "animales")
      this.array = Array<string>("gato","perro","vaca","mariposa","conejo");

    console.log(this.screenOrientation.type);
    this.screenOrientation.onChange().subscribe(
      () => {
        console.log("Orientation Changed " + this.screenOrientation.type);
        this.orientation = this.screenOrientation.type;
      }
    );
  }

  play(value:string){
    this.smartAudioService.play(this.language + "_" + value);
  }
}
