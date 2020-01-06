import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { MultimediaRoutingModule } from './multimedia-routing.module';

import { MultimediaComponent } from './multimedia.component';
import { MediaManagementComponent } from './media-management/media-management.component';
import { ViewMediaComponent } from './components/view-media/view-media.component';

@NgModule({
  declarations: [MultimediaComponent, MediaManagementComponent, ViewMediaComponent],
  imports: [
    CommonModule,
    SharedModule,
    MultimediaRoutingModule
  ],
  entryComponents: [
    ViewMediaComponent
  ]
})
export class MultimediaModule { }
