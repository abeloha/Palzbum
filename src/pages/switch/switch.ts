import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { DatabaseProvider } from './../../providers/database/database';
import { MainPage } from '../';
import { MembersService } from '../../providers/items/members.service';

@IonicPage()
@Component({
  selector: 'page-switch',
  templateUrl: 'switch.html'
})
export class SwitchPage {
  
  groups = [];
  noGroup = 0;

  constructor(public navCtrl: NavController, private databaseprovider: DatabaseProvider, 
    private memberservice: MembersService, public toastCtrl: ToastController, 
    public translateService: TranslateService) {    
      this.loadGroupData();
   }

  login(){
    this.navCtrl.push('LoginPage');
  }
  demo(){
      this.navCtrl.push('DemoGridPage');
  }

  loadGroupData(){    
    this.databaseprovider.getMyGroups().then(data => {
      if(data){
        this.groups = data.group;
      }
    });
    
  }

  async openGroup(group_member_id, group_id, user_id, user_password, user_email) {
    await this.databaseprovider.setCurrentGroupId(group_id);
    await this.databaseprovider.setCurrentGroupMemberId(group_member_id);     
    await this.databaseprovider.setCurrentUserId(user_id);
    this.databaseprovider.setCurrentUserPassword(user_password);
    this.databaseprovider.setCurrentUserEmail(user_email);    

    await this.databaseprovider.setGroupId();

    await this.memberservice.loadMemberData();

    this.navCtrl.push(MainPage);

  }

  
}
