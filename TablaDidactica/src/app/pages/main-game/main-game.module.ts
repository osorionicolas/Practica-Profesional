import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MainGamePage } from './main-game.page';
import { GameComponent } from 'src/app/components/game/game.component';
import { ComponentModule } from 'src/app/components/components.module';

const routes: Routes = [
  {
    path: '',
    component: MainGamePage
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
  declarations: [MainGamePage, GameComponent]
})
export class MainGamePageModule {}
