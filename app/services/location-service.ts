import { Injectable } from '@angular/core';
declare var google: any;

@Injectable()
export class LocationService {

     constructor() {
        
    }

   public getMyLocation () : Promise<String>{

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

                 console.log(cidade + ' / '+ estado);
                 
                 
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
                this.getMyLocation();


            }, locationOptions
 
        );

});

return promise;

  }


}