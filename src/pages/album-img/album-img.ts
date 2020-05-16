import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { DatabaseProvider } from './../../providers/database/database';

@IonicPage()
@Component({
  selector: 'page-album-img',
  templateUrl: 'album-img.html'
})
export class AlbumImgPage {
  cardItems: any[];
  name: string;
  album_id = 0;
  constructor(public navCtrl: NavController, navParams: NavParams, public loadingCtrl: LoadingController, private databaseprovider: DatabaseProvider, private storage: Storage, public modalCtrl: ModalController) {
    this.name = navParams.get('name') || 'Others';
    this.album_id = navParams.get('album_id') || 0;

    this.loadAlbumData();

  }

  async loadAlbumData() {

    let loading = this.loadingCtrl.create({
      content: 'Loading photos...'
    });
  
    loading.present();

    let groupId = 0;
    await this.storage.get('current_group_id').then(val => {
      if (val) {
        groupId = val;
      }
    });
    
    console.log('Album for group: '+groupId);
   

    if(this.album_id){
      await this.databaseprovider.getPhotoByAlbum(this.album_id).then(dataIm => {
        this.cardItems = dataIm.photo;
        loading.dismiss();
      });
    }else{
      this.databaseprovider.getPhotoByAlbumOthers().then(dataIm => {
        this.cardItems = dataIm.photo;
        loading.dismiss();
      });
    }    

  }

  openItem(member) {
    this.navCtrl.push('ItemDetailPage', {
      data: member
    },{
      animate: true,
      direction: 'forward'
    });
  }

  imageView(image) {
    let addModal = this.modalCtrl.create('ImageViewPage', {image: image});
    addModal.present();
  }
  
}
