import { DatabaseProvider } from './../../providers/database/database';
import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController} from 'ionic-angular';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-album',
  templateUrl: 'album.html'
})
export class AlbumPage {
  groupId = 0;
  member = {};
  members = [];
  noMembers = 0;
  
  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, private databaseprovider: DatabaseProvider, private storage: Storage) {
    this.checkCurrentGroup();
    this.storage.set('view_list', false);
    this.databaseprovider.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.loadAlbumData();
      }
    })
  }
 
  async checkCurrentGroup(){
    await this.storage.get('current_group_id').then(val => {
      if (val) {
        this.groupId = val;
      } else {
        console.log('Exiting grid to group');
        this.navCtrl.setRoot('GroupPage', {}, {
          animate: true,
          direction: 'forward'
        });
      }
    });
  }


  openItem(album_id,name) {
    this.navCtrl.push('AlbumImgPage', {
      album_id: album_id,
      name:name
    },{
      animate: true,
      direction: 'forward'
    });
  }

  async loadAlbumData() {

    let loading = this.loadingCtrl.create({
      content: 'Loading album...'
    });

    let groupId = 0;
    await this.storage.get('current_group_id').then(val => {
      if (val) {
        groupId = val;
      }
    });
    
    console.log('Album for group: '+groupId);
    let members = [];

    await this.databaseprovider.getAlbumAll(groupId).then(data => {
      if(data){
        members = data.album;

        members.forEach(element => {

          this.databaseprovider.getPhotoByAlbum(element.album_id).then(dataIm => {
            if(dataIm){
              let im = dataIm.photo;
              let count = 0;
              let img = '';
              im.forEach(elementIm => {
                count = count+1;
                if(!img){
                  img = this.databaseprovider.resoveImagePath(elementIm.name);
                }
              });

              if(count){                
                this.members.push({id:element.id, name:element.name, album_id:element.album_id, count:count,img:img});
              }else{
                this.noMembers = 1;
              }
              
            }
          });
          
        });

        loading.dismiss();

      }else{
        loading.dismiss();
      }
    })

    this.databaseprovider.getPhotoByAlbumOthers().then(dataIm => {
      if(dataIm){
        let im = dataIm.photo;
        let count = 0;
        let img = '';
        im.forEach(elementIm => {
          count = count+1;
          if(!img){
            img = this.databaseprovider.resoveImagePath(elementIm.name);
          }
        });

        if(count){
          this.noMembers = 0;
          this.members.push({id:0, name:'Others', album_id:0, count:count,img:img});
        }
        
      }
    });

  }

  openList()  {
    this.navCtrl.push('ListGridPage');
  }


}
