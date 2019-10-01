import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPage } from './main.page';

const routes: Routes = [
  { path: '', component: MainPage, children: [
    { path: 'gallery/lindas', loadChildren: 'src/app/pages/gallery/gallery.module#GalleryPageModule' },
    { path: 'gallery/feas', loadChildren: 'src/app/pages/gallery/gallery.module#GalleryPageModule' },
    { path: 'camera/lindas', loadChildren: 'src/app/pages/photos/photos.module#PhotosPageModule' },
    { path: 'camera/feas', loadChildren: 'src/app/pages/photos-feas/photos-feas.module#PhotosFeasPageModule' },
    { path: 'home', redirectTo: '/home' },
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsRoutingModule { }
