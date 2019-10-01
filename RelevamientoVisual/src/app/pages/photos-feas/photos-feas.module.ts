import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PhotosFeasPage } from './photos-feas.page';
import { ComponentModule } from 'src/app/components/components.module';

const routes: Routes = [
  {
    path: '',
    component: PhotosFeasPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentModule
  ],
  declarations: [PhotosFeasPage]
})
export class PhotosFeasPageModule {}
