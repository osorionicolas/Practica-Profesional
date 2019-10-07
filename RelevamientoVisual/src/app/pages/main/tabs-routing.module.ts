import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPage } from './main.page';

const routes: Routes = [
  { path: '', component: MainPage, children: [
    { path: 'gallery/lindas', loadChildren: 'src/app/pages/gallery/gallery.module#GalleryPageModule' },
    { path: 'gallery/feas', loadChildren: 'src/app/pages/gallery/gallery.module#GalleryPageModule' },
    { path: 'camera/lindas', loadChildren: 'src/app/pages/photos/photos.module#PhotosPageModule' },
    { path: 'camera/feas', loadChildren: 'src/app/pages/photos-feas/photos-feas.module#PhotosFeasPageModule' },
    { path: 'chart/lindas', loadChildren: 'src/app/pages/chart/chart.module#ChartPageModule' },    
    { path: 'chart/feas', loadChildren: 'src/app/pages/chart-feas/chart-feas.module#ChartFeasPageModule' },
    { path: 'list/lindas', loadChildren: 'src/app/pages/list/list.module#ListPageModule' },
    { path: 'list/feas', loadChildren: 'src/app/pages/list-feas/list-feas.module#ListFeasPageModule' },        
    { path: 'home', redirectTo: '/home' },
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsRoutingModule { }
