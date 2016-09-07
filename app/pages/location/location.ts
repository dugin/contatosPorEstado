import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {LocationService} from '../../services/location-service';
import { LoadingController, Loading } from 'ionic-angular';
import {ListContactsPage} from '../list-contacts/list-contacts';


@Component({
  templateUrl: 'build/pages/location/location.html',
   providers: [LocationService]
})
export class LocationPage {

  loader: Loading;
  estado: String;

  constructor(private navCtrl: NavController, public locationService : LocationService,
   public loadingCtrl: LoadingController) {
    
  }


  setMyLocation() {
        this.presentLoading();

     this.locationService.getMyLocation().then (city => {
       
       this.loader.dismiss();
       this.estado = city;

       console.log(this.estado);
       
      

     }
     ).catch ( error =>{

        console.log(error);
        

     })



  }

  nextPage(){

     this.navCtrl.push(ListContactsPage, {
      city: this.estado
        });
  }

   presentLoading() {
     this.loader = this.loadingCtrl.create({
      content: "Localizando..."
    });
    this.loader.present();
  }
}
