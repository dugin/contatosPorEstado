import { Injectable } from '@angular/core';
declare var google: any;
import { Diagnostic } from 'ionic-native';
import { AlertController } from 'ionic-angular';

@Injectable()
export class LocationService {

     constructor(public alertCtrl: AlertController) {
        
    }

   public getMyLocation () : Promise<String>{

       

       this.checkLocationPermission();

let promise: Promise<String> = new Promise((resolve, reject) =>{

let locationOptions = {timeout: 10000, enableHighAccuracy: true};
 navigator.geolocation.getCurrentPosition(  (position) => {

          let geocoder = new google.maps.Geocoder();;
           
let latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

geocoder.geocode(
    {'latLng': latlng}, 
       (results, status)  =>{
        if (status == google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                   
                 let estado = results[0].address_components[5].short_name;
                 let cidade = results[0].address_components[3].long_name;

                 
                   resolve(cidade + ' / '+ estado);
                   
                }
                else  {
                    alert("address not found");
                }
        }
         else {
            alert("Geocoder failed due to: " + status);
        }
    }
);

 },    (error) => {
              
              reject(error);
                console.log(error);
              


            }, locationOptions
 
        );

});

return promise;

  }


  checkLocationPermission (){

      Diagnostic.isLocationAvailable().then( data =>{
          console.log(data);
          
            if(!data)
                 this.showAlert("Localização", "Necessitamos do GPS habilidado para obter a sua localização.")


            else{
                Diagnostic.requestLocationAuthorization().then(data =>{
                    console.log(data);


                    if(!data)
                    this.showAlert("Localização", "Necessitamos da sua autorização para obter a sua localização.")

                })
            }
      })

      


  }


   showAlert(title: string, text: string) {

      let d = new Diagnostic();
       

    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text ,
      buttons: [{
          text: 'OK',
          handler: data => {
            
      }}]
    });
    alert.present();
  }



}