import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { SwitchPage } from './switch';

@NgModule({
  declarations: [
    SwitchPage,
  ],
  imports: [
    IonicPageModule.forChild(SwitchPage),
    TranslateModule.forChild()
  ],
  exports: [
    SwitchPage
  ]
})
export class SwitchPageModule { }
