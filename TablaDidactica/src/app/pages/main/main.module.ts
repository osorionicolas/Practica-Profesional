import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MainPage } from './main.page';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { ComponentModule } from 'src/app/components/components.module';
import { TopicComponent } from 'src/app/components/topic/topic.component';
import { GameComponent } from 'src/app/components/game/game.component';

const routes: Routes = [
  {
    path: '',
    component: MainPage
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
  declarations: [MainPage,ButtonComponent,TopicComponent,GameComponent]
})
export class MainPageModule {}
