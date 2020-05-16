import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { GroupPage } from './group';

@NgModule({
  declarations: [
    GroupPage,
  ],
  imports: [
    IonicPageModule.forChild(GroupPage),
    TranslateModule.forChild()
  ],
  exports: [
    GroupPage
  ]
})
export class GroupPageModule { }
