import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { Api } from '../../providers/api/api';
import { Storage } from '@ionic/storage';
import { AppVersion } from '../';
import { DatabaseProvider } from './../../providers/database/database';
import { MembersService } from '../../providers/items/members.service';
import { RootUrl, MainPage } from '../';

import { MyApp } from '../../app/app.component';

@IonicPage()
@Component({
  selector: 'page-group',
  templateUrl: 'group.html'
})
export class GroupPage {

  user_id = 0;
  user_password = '';
  user_email = '';

  account: { user_id: number, app_version: string } = {
    user_id: 0,
    app_version: AppVersion
  };

  palz: { group_member_id: number, app_version: string, exclude_group_member_id:string } = {
    group_member_id: 0,
    app_version: AppVersion,
    exclude_group_member_id: '',
  };
  webUrl = RootUrl;
  groups = [];
  noGroup = 0;
  showReload = 0;
  readySyn =  0;
  noSyn = 0;
      // Our translated text strings
  private networkErrorString: '';

  constructor(public navCtrl: NavController, private storage: Storage, private databaseprovider: DatabaseProvider, 
    public toastCtrl: ToastController, public loadingCtrl: LoadingController, public alertController: AlertController, 
    public translateService: TranslateService, private memberservice: MembersService, 
    public myapp: MyApp, public api: Api) {
    this.translateService.get('NETWORK_ERROR').subscribe((value) => {
      this.networkErrorString = value;
    })
    
    this.storage.get('user_id').then(val => {
      if (val) {
        this.account.user_id = val;
        this.user_id = val;

        this.loadLoginDetails();
        this.loadGroupData();

      } else {
        this.navCtrl.setRoot('LoginPage', {}, {
          animate: true,
          direction: 'forward'
        });
      }
    });
    
   }

   loadLoginDetails(){

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

   }

  tryAgain(){
    this.loadGroupData();
  }
  login(){
    this.navCtrl.push('LoginPage');
  }
  demo(){
      this.navCtrl.push('DemoGridPage');
  }

  loadGroupData(){

    let loading = this.loadingCtrl.create({
      content: 'Loading your groups...'
    });
  
    loading.present();


    let seq = this.api.get('groups', this.account).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 'success') {
        this.groups = res.data;
        loading.dismiss();
      } else {        
        let toast = this.toastCtrl.create({
          message: res.message,
          duration: 6000,
          position: 'top'
        });
        toast.present();

        loading.setContent(res.message);
        setTimeout(() => {
          loading.dismiss();
        }, 5000);
      
        this.noGroup = 1;
      }

     
      console.log(res);
    }, err => {
      
      this.showReload = 1;

      let toast = this.toastCtrl.create({
        message: this.networkErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();

      //loading.setContent(this.networkErrorString);
      setTimeout(() => {
        loading.dismiss();
      }, 5000);

      console.error('ERROR', err);
    });


  }

  async openGroup(group_member_id, group_name, group_id, description) {
    this.noSyn = 0;

    await this.databaseprovider.getGroupMemberIdAll(group_id).then(data => {

      
      if(data.status = 'success'){

        this.palz.exclude_group_member_id =  data.str_member_id; 

        this.readySyn = 1;    
      }
     
    })

    let loading = this.loadingCtrl.create({
      content: 'Synchronizing ' + group_name + '...'
    });
  
    loading.present();

                if(!this.readySyn){
                  loading.setContent('Please try again after some time...');
                  setTimeout(() => {
                    loading.dismiss();
                  }, 3000);
                  return;
                }

    this.palz.group_member_id = group_member_id;
    let seq = this.api.get('palz', this.palz).share();
    await seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 'success') {

        loading.dismiss();
        console.log('before insertMembers');
        this.insertMembers(res.data, group_id, group_name, description, group_member_id);
        console.log('after insertMembers');

      } else {
        loading.dismiss();
        this.presentAlert(res.message);
      }
      console.log(res);
    }, err => {
      
      let toast = this.toastCtrl.create({
        message: this.networkErrorString,
        duration: 6000,
        position: 'top'
      });
      toast.present();

      loading.setContent(this.networkErrorString);
      setTimeout(() => {
        loading.dismiss();
      }, 3000);

      console.error('ERROR', err);
    });

  }

  async presentAlert(message) {
    const alert = await this.alertController.create({
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  async insertMembers(data, group_id, group_name, description, group_member_id){
    let loading = this.loadingCtrl.create({
      content: 'Saving data for ' + group_name + '...'
    });
    
        
    loading.present();

    this.noSyn = 0;
    
    console.log('insert_reached');
    console.log(data);

    for(let member of data){
      await this.insertToDb(member);
    }

    if (this.noSyn){

      this.showToast(this.noSyn + ' profiles synchronised',5000);

      await this.addGroupSyn(group_id, group_name, group_member_id, description);

      await this.databaseprovider.setCurrentGroupId(group_id);
      await this.databaseprovider.setCurrentGroupMemberId(group_member_id);      

      loading.setContent('Downloading profile images for ' + group_name + '...');
      await this.insertMembersProgfileImage(group_id);      
      console.log(this.noSyn + 'records inserted successfully');

      await this.memberservice.loadMemberData();

      //for menue to update
      this.myapp.updateThisGroupId(group_id);

      this.navCtrl.push(MainPage);

      this.databaseprovider.updatehandler();

      loading.dismiss();
    }else{
      console.log('NO records inserted');
      this.showToast('NO records inserted', 5000);
      loading.dismiss();
    }
  }

  async insertToDb(member){
    await this.databaseprovider.addPeople(member).then(data => {
      this.noSyn = this.noSyn + 1;
    })
  }

  async insertMembersProgfileImage(group_id){

    console.log('fetched images in group...')

    await this.databaseprovider.downloadProfileImage(group_id).then(data => {     
    })

    console.log('done fetched images in group...')
    
  }

  async addGroupSyn(group_id, name, group_member_id, description){
    console.log('addGroupSyn');
    await this.databaseprovider.addGroup(group_id, name, group_member_id, description, this.user_id, this.user_password, this.user_email).then(data => {
      return 1;
    })
  }

  showToast(message:string, duration: number){
    let toast = this.toastCtrl.create({
      message: message,
      duration: duration,
      position: 'top'
    });
    toast.present();
  }
}
