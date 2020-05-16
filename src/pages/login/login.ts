import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { Api } from '../../providers/api/api';
import { User } from '../../providers';
import { Storage } from '@ionic/storage';
import { AppVersion } from '../';
import { RootUrl } from '../';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { email: string, password: string, app_version: string } = {
    email: '',
    password: '',
    app_version: '' + AppVersion
  };


  webUrl = RootUrl;
  

  // Our translated text strings
  private loginErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public api: Api, public alertController: AlertController,
    private storage: Storage,
    public toastCtrl: ToastController, public loadingCtrl: LoadingController,
    public translateService: TranslateService) {

    this.translateService.get('NETWORK_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    })
  }

  // Attempt to login in through our User service
doLogin() {

    if(this.account.email == '' || this.account.password == ''){
      return this.presentAlert('Enter your email and password to login');
    }

    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  
    loading.present();
  

    let seq = this.api.get('login', this.account).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 'success') {
        this.storage.set('user_id', res.userId);
        this.storage.set('user_email', this.account.email);
        this.storage.set('user_password', this.account.password);

        this.navCtrl.push('GroupPage');
        loading.dismiss();
      } else {
        loading.setContent(res.message);
        let toast = this.toastCtrl.create({
          message: res.message,
          duration: 6000,
          position: 'top'
        });
        toast.present();
        setTimeout(() => {
          loading.dismiss();
        }, 3000);
      
      }

     
      console.log(res);
    }, err => {
      
      loading.dismiss();
      //this.navCtrl.push(MainPage);
      // Unable to log in
      let toast = this.toastCtrl.create({
        message: this.loginErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
      console.error('ERROR', err);
    });

  }

  demo(){
      this.navCtrl.push('DemoGridPage');
  }

  openWeb(url) {
    this.navCtrl.push('WebPage', {
      url: url
    },{
      animate: true,
      direction: 'forward'
    });
  }

  async presentAlert(message) {
    const alert = await this.alertController.create({
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

}
