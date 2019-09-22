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
  @Input() private language: string;
  @Input() private topic: string;

  constructor(private screenOrientation: ScreenOrientation, private smartAudioService: SmartAudioService) {
    this.topic = "animals";
    this.language = "espanol";
    if(this.topic == "colors")
      this.array = Array<string>("success","danger","primary","warning","tertiary");
    if(this.topic == "numbers")
      this.array = Array<string>("uno","dos","tres","cuatro","cinco");
    if(this.topic == "animals")
      this.array = Array<string>("gato","perro","vaca","mariposa","conejo");
  }

  ngOnInit() {
    console.log(this.screenOrientation.type);
    this.screenOrientation.onChange().subscribe(
      () => {
        console.log("Orientation Changed " + this.screenOrientation.type);
        this.orientation = this.screenOrientation.type;
      }
    );
  }

  play(value:string){
    console.log("Play " + this.language + "_" + value);
    this.smartAudioService.play(this.language + "_" + value);
  }
}
