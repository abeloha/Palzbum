import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { AlbumPage } from './album';

@NgModule({
  declarations: [
    AlbumPage,
  ],
  imports: [
    IonicPageModule.forChild(AlbumPage),
    TranslateModule.forChild()
  ],
  exports: [
    AlbumPage
  ]
})
export class AlbumPageModule { }
