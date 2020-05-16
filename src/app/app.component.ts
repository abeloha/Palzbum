import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from '@ngx-translate/core';
import { Config, Nav, Platform, LoadingController, AlertController } from 'ionic-angular';
import { Api } from '../providers/api/api';
import { FirstRunPage, MainPage, WelcomePage, AppVersion } from '../pages';
import { MembersService } from './../providers/items/members.service';

import { DatabaseProvider } from './../providers/database/database';

import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';


import { Storage } from '@ionic/storage';

@Component({
  template: `<ion-menu [content]="content" class="my-sidemenu">
    <ion-header >
      <ion-toolbar>
        <ion-title>Menu</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>

        <span *ngIf="groupId != 0">
        <button menuClose ion-item *ngFor="let p of pages"  (click)="openPage(p.component)">
          {{p.title}}
        </button>
         </span>

        <button menuClose ion-item (click)="openPage('DemoGridPage')">Demo</button>
        <button menuClose ion-item (click)="openPage('LoginPage')">Add Account</button>
        <button menuClose ion-item (click)="about()">About</button>
      </ion-list>
    </ion-content>

  </ion-menu>
  <ion-nav #content [root]="rootPage"></ion-nav>`
})
export class MyApp {
  activePage: any;
  rootPage = WelcomePage;
  firstrun = 0;

  groupId = 0;

  @ViewChild(Nav) nav: Nav;

  pages: any[] = [
    { title: 'Grid View', component: 'ListGridPage' },
    { title: 'List View', component: 'ListMasterPage' },
    { title: 'Photo Album', component: 'AlbumPage' },
    { title: 'Switch Group', component: 'SwitchPage' }
  ]

  constructor(private translate: TranslateService, platform: Platform,  private databaseprovider: DatabaseProvider, 
    public loadingCtrl: LoadingController, private config: Config, private statusBar: StatusBar, public alertController: AlertController,
    private splashScreen: SplashScreen, private storage: Storage, public api: Api, private memberservice:MembersService, public admob: AdMobFree) {
    platform.ready().then(() => {                                          
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.memberservice.loadMembers();
      this.storage.get('current_group_id').then(val => {
        if (val) {
          this.groupId = val;
        }
      });
            
      let loading = this.loadingCtrl.create({
        content: 'Loading, please wait...'
      });
    
      loading.present();

      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.storage.get('not_first_run').then(val => {
        if (val) {
          this.setRootPageMain();          
          loading.dismiss();
        } else {
          this.rootPage = FirstRunPage;
          this.firstrun = 1;
          loading.dismiss();
        }
      });

     this.updatehandler();     

    });
    this.initTranslate();
  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();

    if (browserLang) {
      if (browserLang === 'zh') {
        const browserCultureLang = this.translate.getBrowserCultureLang();

        if (browserCultureLang.match(/-CN|CHS|Hans/i)) {
          this.translate.use('zh-cmn-Hans');
        } else if (browserCultureLang.match(/-TW|CHT|Hant/i)) {
          this.translate.use('zh-cmn-Hant');
        }
      } else {
        this.translate.use(this.translate.getBrowserLang());
      }
    } else {
      this.translate.use('en'); // Set your language here
    }

    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  }

  async setRootPage(){
  }

  
  async setRootPageMain(){
    await this.storage.get('user_id').then(val => {
      if (val !="" && this.firstrun == 0 ) {
        this.storage.get('view_list').then(val => {
          if (val) {
            this.rootPage =  'ListMasterPage';
          }else{
            this.rootPage =  MainPage;
          }
        });

      }else  if(!this.firstrun ){
        this.rootPage =  'LoginPage';
      } 
    });


    
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page);
    this.activePage = page;
  }

  public checkActivePage(page): boolean{
    return page === this.activePage;
  }
  
  async about(){
    const alert = await this.alertController.create({
      title: '<h1>Palzbum App</h1>',
      message: '<p>This is an offline app for Palzbum.com that allows you to synchronize your palzbum.com groups and have offline access to the group profiles and photos.</p>'+
                    '<br><p>Developed by <a hreff="http://www.suprixtechnology.com"> Suprix Technology</a>.</p>'+
                    '<span><b>Version: ' + AppVersion +'</b></span>',
      buttons: ['OK']
    });
    await alert.present();
  }

  async updatehandler(){

    let  groupId = 0;
    
    await this.storage.get('current_group_id').then(val => {
      if (val) {
        groupId = val;
      }
    });

    if(!groupId){
      console.log('Aborting updatehandler, REASON: No group id set');
      return;
    }

    this.AdBanner();
    
    console.log('(((((((((((((((((Update Handler)))))))))))))))))');

    this.databaseprovider.updatehandler();
    setTimeout(() => {
      this.updatehandler()
    }, 600000);

  }


  AdBanner() {
    console.log('Proccessing Ad');
    let bannerConfig: AdMobFreeBannerConfig = {
        //isTesting: false, // Remove in production  ca-app-pub-3940256099942544/6300978111
        //ca-app-pub-3941325609727541/3256292265
        autoShow: true,
        id: 'ca-app-pub-3941325609727541/3256292265'
    };

    this.admob.banner.config(bannerConfig);

    this.admob.banner.prepare().then(() => {
      console.log('Proccessing Ad Successful');
    }).catch(e => console.log(e));

}

updateThisGroupId(val){
  this.groupId = val;
}

}
