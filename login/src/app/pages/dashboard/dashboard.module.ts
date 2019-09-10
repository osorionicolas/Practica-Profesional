import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DashboardPage } from './dashboard.page';
import { FlashlightComponent } from '../../components/flashlight/flashlight.component';
import { CameraComponent } from '../../components/camera/camera.component';
import { GyroscopeComponent } from '../../components/gyroscope/gyroscope.component';
import { NavControllerComponent } from 'src/app/components/nav-controller/nav-controller.component';
import { QrscannerComponent } from 'src/app/components/qrscanner/qrscanner.component';
import { NotificationsComponent } from 'src/app/components/notifications/notifications.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    DashboardPage, 
    FlashlightComponent,
    CameraComponent, 
    GyroscopeComponent, 
    NavControllerComponent, 
    QrscannerComponent, 
    NotificationsComponent
  ],

})
export class DashboardPageModule {}
