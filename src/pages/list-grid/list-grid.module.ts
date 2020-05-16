import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { ListGridPage } from './list-grid';

@NgModule({
  declarations: [
    ListGridPage,
  ],
  imports: [
    IonicPageModule.forChild(ListGridPage),
    TranslateModule.forChild()
  ],
  exports: [
    ListGridPage
  ]
})
export class ListGridPageModule { }
