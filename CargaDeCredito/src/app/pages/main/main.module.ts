import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MainPage } from './main.page';
import { ScanButtonComponent } from 'src/app/components/scan-button/scan-button.component';
import { CreditChargesListComponent } from 'src/app/components/credit-charges-list/credit-charges-list.component';
import { CreditChargesCounterComponent } from 'src/app/components/credit-charges-counter/credit-charges-counter.component';

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
    RouterModule.forChild(routes)
  ],
  declarations: [MainPage, ScanButtonComponent, CreditChargesListComponent, CreditChargesCounterComponent]
})
export class MainPageModule {}
