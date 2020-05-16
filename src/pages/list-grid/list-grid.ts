import { DatabaseProvider } from './../../providers/database/database';
import { Component } from '@angular/core';
import { IonicPage, NavController, } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Member } from '../../models/member';
import { MembersService } from '../../providers/items/members.service';

@IonicPage()
@Component({
  selector: 'page-list-grid',
  templateUrl: 'list-grid.html'
})
export class ListGridPage {
  members:Member[]; 
  membersMaster = [];
  noMembers = 0;

  searchTerm: string = '';

  constructor(public navCtrl: NavController, private databaseprovider: DatabaseProvider, private memberservice: MembersService, private storage: Storage) {
    this.checkCurrentGroup();
    this.storage.set('view_list', false);
    this.loadMemberData();
  }
 
  async checkCurrentGroup(){
    await this.storage.get('current_group_id').then(val => {
      if (val) {} else {
        console.log('Exiting grid to group');
        this.navCtrl.setRoot('GroupPage', {}, {
          animate: true,
          direction: 'forward'
        });
      }
    });
  }

  initializeMember(): void {
    this.members = this.membersMaster;
  }

  openItem(data) {
    this.navCtrl.push('ItemDetailPage', {
      data: data
    },{
      animate: true,
      direction: 'forward'
    });
  }

   loadMemberData() {
    this.membersMaster = this.memberservice.getMembers();
    if(this.membersMaster.length != 0){
      this.members = this.membersMaster;
      this.noMembers = 0;
    }else{
      this.noMembers = 1;

      //if no data, try again
        setTimeout(() => {
          this.loadMemberData()
        }, 250);
    }

    this.memberservice.loadMemberData();
  }

  openList()  {
    this.navCtrl.setRoot('ListMasterPage');
  }

  openPhoto() {
    this.navCtrl.push('AlbumPage', {},{
      animate: true,
      direction: 'forward'
    });
  }
  
  openGroup() {
    this.navCtrl.push('SwitchPage', {},{
      animate: true,
      direction: 'forward'
    });
  }

  searchMembers(){
    // Reset Members array back to all of the items
    this.initializeMember();

    // if the search term is an empty string return all items
    if (!this.searchTerm) {
      return this.members;
    }
    
    // Filter recipes
    this.members = this.members.filter((item) => {
        return item.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
    }); 
  }

  

}
