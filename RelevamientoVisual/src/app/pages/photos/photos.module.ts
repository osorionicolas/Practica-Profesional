import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PhotosPage } from './photos.page';
import { CameraComponent } from 'src/app/components/camera/camera.component';

const routes: Routes = [
  {
    path: '',
    component: PhotosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PhotosPage, CameraComponent]
})
export class PhotosPageModule {}
