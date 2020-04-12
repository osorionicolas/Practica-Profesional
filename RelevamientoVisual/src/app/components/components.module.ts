import { NgModule } from '@Angular/core';
import { CameraComponent } from './camera/camera.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
    declarations: [CameraComponent],
    exports: [CameraComponent],
    imports: [IonicModule]
})
export class ComponentModule{}