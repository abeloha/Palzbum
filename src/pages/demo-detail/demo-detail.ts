import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { DatabaseProvider } from './../../providers/database/database';
import { Component } from '@angular/core';


@IonicPage()
@Component({
  selector: 'page-demo-detail',
  templateUrl: 'demo-detail.html'
})
export class DemoDetailPage {
  group_member_id: number;
  member = {};

  photo = {};
  photos = [];

  interest = {};
  interests = [];

  constructor(private databaseprovider: DatabaseProvider,  public navCtrl: NavController, navParams: NavParams, public modalCtrl: ModalController) {
    this.group_member_id = navParams.get('group_member_id') || 0;

    this.databaseprovider.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.loadMemberData();
        this.loadPhotos();
      }
    })

  }

  loadMemberData() {
    this.databaseprovider.getDemoMemberData(this.group_member_id).then(data => {
      this.member = data;
    })
  }

  loadPhotos() {
    this.databaseprovider.getDemoMemberPhotos(this.group_member_id).then(data => {
      this.photos = data;
    })
  }

  morePictures() {
   
  }

  imageView(image) {
    let addModal = this.modalCtrl.create('ImageViewPage', {image: image});
    addModal.present();
  }

}
