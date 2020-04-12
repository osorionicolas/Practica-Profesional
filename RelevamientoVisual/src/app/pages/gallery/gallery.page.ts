import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss'],
})
export class GalleryPage implements OnInit {

  @Output() actualizarListado: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { 
  }

  ngOnInit() {
  }

  actualizar(){
    this.actualizarListado.emit(true);
  }

}
