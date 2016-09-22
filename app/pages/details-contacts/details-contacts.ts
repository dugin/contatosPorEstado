import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Contact, Clipboard } from 'ionic-native';

declare var CallNumber: any;

/*
  Generated class for the DetailsContactsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/details-contacts/details-contacts.html',
})
export class DetailsContactsPage {

  contact : Contact;

  constructor(public toastCtrl: ToastController, private navCtrl: NavController, private navParams :NavParams) {

    this.contact =  this.navParams.get('contact');

   
  }

  callNumber(number: string){

   console.log(number);
    

    CallNumber.prototype.callNumber((success =>{

      console.log('Launched dialer! - '+success);

    }), (error=>{
      console.log('Error launching dialer - '+ error)

    })  , number, true);
  
 

  }

  copyToClipboard(number: string){

    Clipboard.copy(number).then (success =>{

            this.presentToast(number);
    });


  }

  presentToast(number: string) {
    let toast = this.toastCtrl.create({
      message: 'Número '+ number + ' copiado!',
      duration: 3000
    });
    toast.present();
  }


}
