import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPage } from './main.page';

const routes: Routes = [
  { path: '', component: MainPage, children: [
    { path: 'gallery', loadChildren: 'src/app/pages/gallery/gallery.module#GalleryPageModule' },
    { path: 'camera', loadChildren: 'src/app/pages/photos/photos.module#PhotosPageModule' },
    { path: '', redirectTo: '/main/camera', pathMatch: 'full' }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsRoutingModule { }
