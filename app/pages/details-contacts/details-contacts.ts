import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, Platform } from 'ionic-angular';
import { Contact, Clipboard, SocialSharing } from 'ionic-native';
import {WhatsappNumberUtil} from '../../util/whatsapp-number-util'
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
 

  constructor(public toastCtrl: ToastController, private navCtrl: NavController, private navParams :NavParams, private platform: Platform) {

    this.contact =  this.navParams.get('contact');

  }

  sendViaWhatsapp(number: string, contact: Contact){
    
   let tel ;

    if (this.platform.is('ios'))
        tel = contact.id;

else{
  tel  = WhatsappNumberUtil.transformNumber(number);
   

   if(tel.localeCompare('excessao') == 0 )
        alert(number);
   
} 

 console.log(tel);
    SocialSharing.shareViaWhatsAppToReceiver(tel,"",null, null).then((d) =>{

      console.log("then: "+d);
      

    }).catch( (err) =>{

      console.log("err: "+ err);
      
    });

  }

  callNumber(number: string){

 
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
