import { Component, Input } from '@angular/core';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { SmartAudioService } from 'src/app/services/smart-audio.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent {

  private orientation: string;

  private array: Array<string>;
  @Input() language: string;
  @Input() topic: string;

  constructor(private screenOrientation: ScreenOrientation, private smartAudioService: SmartAudioService) {}

  ngOnChanges() {
    if(this.topic == "colores")
      this.array = Array<string>("verde","rojo","azul","amarillo","violeta");
    if(this.topic == "numeros")
      this.array = Array<string>("uno","dos","tres","cuatro","cinco");
    if(this.topic == "animales")
      this.array = Array<string>("gato","perro","vaca","mariposa","conejo");
  }

  play(value:string){
    this.smartAudioService.play(this.language + "_" + value);
  }
}
