import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { AlbumImgPage } from './album-img';

@NgModule({
  declarations: [
    AlbumImgPage,
  ],
  imports: [
    IonicPageModule.forChild(AlbumImgPage),
    TranslateModule.forChild()
  ],
  exports: [
    AlbumImgPage
  ]
})
export class AlbumImgPageModule { }
