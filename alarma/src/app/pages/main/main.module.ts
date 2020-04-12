import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MainPage } from './main.page';
import { AlarmComponent } from 'src/app/components/alarm/alarm.component';
import { SirenComponent } from 'src/app/components/siren/siren.component';
import { ComponentModule } from 'src/app/components/components.module';

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
  declarations: [MainPage,AlarmComponent,SirenComponent]
})
export class MainPageModule {}
