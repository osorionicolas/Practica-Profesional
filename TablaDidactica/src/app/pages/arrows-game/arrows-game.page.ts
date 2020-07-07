import { Component, OnInit } from '@angular/core';
import { pseudoRandomBytes } from 'crypto';

@Component({
  selector: 'app-arrows-game',
  templateUrl: './arrows-game.page.html',
  styleUrls: ['./arrows-game.page.scss'],
})
export class ArrowsGamePage implements OnInit {

  private lastSelection;
  private animalImgs = Array<string>("gato","perro","vaca","mariposa","conejo");
  private animalNames: string[] = ["GATO","PERRO","VACA","MARIPOSA","CONEJO"];
  private responses;
  private selectedOptions = [];

  constructor() { }

  ngOnInit() {
    this.resizeCanvas();
    this.shuffle(this.animalImgs);
    this.shuffle(this.animalNames);
  }

  selectAnswer(element, row, col, selectedOption) {
    if(element.classList.contains('getParent')) {
      element = element.parentElement;
    }

    this.validateSelection(row,col);
    //Ingresa en la segunda opción seleccionada
    if (this.lastSelection) {
      this.lastSelection.element.classList.remove('selected');
    }
    //Ingresa en la primer opción seleccionada
    if (!this.lastSelection || this.lastSelection.col === col) {
      this.lastSelection = {element: element, row: row, col: col};
      element.classList.add('selected');
    } 
    //Ingresa en la segunda opción seleccionada
    else {
      const p1 = this.getPoint(element);
      const p2 = this.getPoint(this.lastSelection.element);
      this.selectedOptions.push({sourceX: p1.x, sourceY: p1.y, sourceCol: col, sourceRow: row, 
        destX: p2.x, destY: p2.y, destCol: this.lastSelection.col, destRow: this.lastSelection.row});
      this.drawLine(p1, p2);
      this.lastSelection = null;
    }
}

  getPoint(element) {
    const roundPointer = element.lastElementChild;
    return {
        y: element.offsetTop + roundPointer.offsetTop + roundPointer.offsetHeight / 2,
        x: element.offsetLeft + roundPointer.offsetLeft + roundPointer.offsetWidth / 2
    };
}

  drawLine(p1, p2) {
    const ctx = this.getCanvasContext();

    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
  }

  resizeCanvas() {
    const ctx = this.getCanvasContext();

    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
  }

  clearCanvas(){
    const ctx = this.getCanvasContext();
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }

  private getCanvasContext(){
    var canvas = <HTMLCanvasElement> document.getElementById("connection-canvas");
    return canvas.getContext("2d");
  }
  
  private validateSelection(row, col) {
    const selectedIndex = this.selectedOptions.findIndex(value => 
      (value.sourceRow == row && value.sourceCol == col) || (value.destRow == row && value.destCol == col)
    )
    if(selectedIndex != -1){
      this.selectedOptions.splice(selectedIndex,1);
      this.reDraw();
    }
  }

  private reDraw(){
    this.clearCanvas();
    this.selectedOptions.forEach(option =>{
      this.drawLine({x: option.sourceX, y: option.sourceY},{x: option.destX, y: option.destY});
    })
  }
  
  private shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

}
