import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { DatabaseProvider } from './../../providers/database/database';
import { Component } from '@angular/core';
import { ApiUrl, AppVersion } from '../../pages';
import { Storage } from '@ionic/storage';
import { Member } from '../../models/member';

@IonicPage()
@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html'
})
export class ItemDetailPage {
  group_member_id: number;
  member:Member;

  photo = {};
  photos = [];

  interest = {};
  interests = [];

  url: string = ApiUrl;
  version = AppVersion;
  user_email = '';
  user_password = '';
  member_id = 0;
  group_id = 0;

  
  constructor(private databaseprovider: DatabaseProvider, private storage: Storage, public navCtrl: NavController, navParams: NavParams, public modalCtrl: ModalController) {
    this.member = navParams.get('data') || '';

    this.databaseprovider.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.loadPhotos();
      }
    })

    this.storage.get('user_email').then(val => {
      if (val) {
        this.user_email = val;
      }      
    });

    this.storage.get('user_password').then(val => {
      if (val) {
        this.user_password = val;
      }      
    });

    this.storage.get('current_group_id').then(val => {
      if (val) {
        this.group_id = val;
      }      
    });

    this.storage.get('current_group_member_id').then(val => {
      if (val) {
        this.member_id = val;
      }      
    });

  }

  loadPhotos() {
    this.databaseprovider.getMemberPhotos(this.member.group_member_id).then(data => {
      this.photos = data;
    })
  }

  chat(group_member_id) {
    let link = this.url+'/chat?app_version='+this.version+'&group_member_id='+group_member_id;
    this.openWeb(link);
  }

  online(group_member_id) {
   let link = this.url+'/profile?app_version='+this.version+'&user_email='+this.user_email+'&p='+this.user_password+'&group_member_id='+group_member_id+'&group_id='+this.group_id+'&member_id='+this.member_id;
    this.openWeb(link);
  }

  openWeb(url) {
    this.navCtrl.push('WebPage', {
      url: url
    },{
      animate: true,
      direction: 'forward'
    });
  }

  imageView(image) {
    let addModal = this.modalCtrl.create('ImageViewPage', {image: image});
    addModal.present();
  }

  urlEncode() {
    alert();
  }

}
