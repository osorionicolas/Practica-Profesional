import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MainPage } from './main.page';
import { ScanButtonComponent } from 'src/app/components/scan-button/scan-button.component';
import { CreditChargesCounterComponent } from 'src/app/components/credit-charges-counter/credit-charges-counter.component';
import { ClearChargesComponent } from 'src/app/components/clear-charges/clear-charges.component';

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
  declarations: [MainPage, ScanButtonComponent, CreditChargesCounterComponent, ClearChargesComponent]
})
export class MainPageModule {}
