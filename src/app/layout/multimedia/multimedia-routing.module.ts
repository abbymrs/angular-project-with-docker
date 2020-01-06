import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MultimediaComponent } from './multimedia.component';
import { MediaManagementComponent } from './media-management/media-management.component';

const routes: Routes = [
  {
    path: '',
    component: MultimediaComponent,
    children: [
      {
        path: 'media-management',
        component: MediaManagementComponent,
        data: { title: 'Multimedia Management' },
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MultimediaRoutingModule { }
