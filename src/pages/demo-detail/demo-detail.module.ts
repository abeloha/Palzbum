import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { DemoDetailPage } from './demo-detail';

@NgModule({
  declarations: [
    DemoDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(DemoDetailPage),
    TranslateModule.forChild()
  ],
  exports: [
    DemoDetailPage
  ]
})
export class DemoDetailPageModule { }
