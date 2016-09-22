import {Component} from '@angular/core';
import {NavController, ViewController} from 'ionic-angular';
import {LocationService} from '../../providers/location-service';
import { LoadingController, Loading } from 'ionic-angular';
import {ListContactsPage} from '../list-contacts/list-contacts';
import { NativeStorage } from 'ionic-native';


@Component({
  templateUrl: 'build/pages/location/location.html',
   providers: [LocationService]
})
export class LocationPage  {

  loader: Loading;
  estado: String;
  loading: boolean ;
  next: boolean;

  constructor(private navCtrl: NavController,private viewCtrl: ViewController ,public locationService : LocationService,
   public loadingCtrl: LoadingController) { 
  }

 
  onChange(changes) {
     this.next = true;
  }


  setMyLocation() {

       this.estado = "";
     
        this.next = false;
       this.loading = true;

     this.locationService.getMyLocation().then (city => {
        this.loading = false;
       this.next = true;
     
       this.estado = city;

     }
     ).catch ( error =>{

        console.log(error);
        

     })

  }

   
  nextPage(){

        this.persistMyState();

     if( this.viewCtrl.enableBack()){

    
        this.navCtrl.setRoot(ListContactsPage,{
      city: this.estado
        }); 
   
      
     } 
          
  else {
     this.navCtrl.push(ListContactsPage, {
      city: this.estado
        });
  }
  }

  persistMyState(){
      NativeStorage.setItem('state', {property: this.estado})
  .then(
    () => console.log('Stored item!'),
    error => console.error('Error storing item', error)
  );

  }

  
}
