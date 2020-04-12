import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-gallery-feas',
  templateUrl: './gallery-feas.page.html',
  styleUrls: ['./gallery-feas.page.scss'],
})
export class GalleryFeasPage implements OnInit {

  @Output() actualizarListado: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  actualizar(){
    this.actualizarListado.emit(true);
  }

}
