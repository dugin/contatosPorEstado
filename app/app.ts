import {Component} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar, Splashscreen, NativeStorage} from 'ionic-native';
import {LocationPage} from './pages/location/location';
import {ListContactsPage} from './pages/list-contacts/list-contacts';
import {TabsPage} from './pages/tabs/tabs';

@Component({
  template:  '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {

  private rootPage: any;

  constructor(private platform: Platform) {
  

    platform.ready().then(() => {

        this.hideSplashScreen();
       

       NativeStorage.getItem('state').then( data => { 

      this.rootPage = TabsPage;
     },
    error =>{  
      console.log(error);
      
      this.rootPage = LocationPage; 
    });
          
       

       
         
       
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  

   hideSplashScreen() {
    
     if (Splashscreen) {
        setTimeout(() => {
          Splashscreen.hide();
      }, 1000);
      }   
      }
}

ionicBootstrap(MyApp, null,{tabsHideOnSubPages:"true", platforms: {
    android: {
      tabsPlacement: 'top'
    },
    ios: {
      tabsPlacement: 'bottom',
      statusbarPadding: true
    }
}
});
